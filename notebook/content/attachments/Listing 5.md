Listing 5.1 illustrates the data structure of the \verb|Cache| class. This class can be used independently as a cache simulator to emulate the behavior of a cache at a specific level, such as an L1 cache. Within this structure, \verb|stack_| is implemented as a doubly linked list that stores the cache blocks. The most recently accessed block is located at the top of the stack (the head of the linked list), whereas the least recently accessed block resides at the bottom. To enable fast lookups, \verb|refmap_| is provided as a \verb|unordered_map| container where each index corresponds to a cache line address, and each value is an iterator pointing to the corresponding block within \verb|stack_|. The \verb|buckets_| variable is a vector used to track cache hits and misses.

Listing 5.1
```cpp
class Cache {
    std::list<MemoryBlock> stack_{};
    std::unordered_map<Addr, StackIterator> refmap_{};
    std::vector<Bucket> buckets_{};
};
```


\verb|MemoryBlock| is a custom data structure that models a cache block. \verb|StackIterator|, defined as an alias for \verb|std::list<MemoryBlock>::iterator|, represents an iterator used to traverse and manipulate elements within the \verb|stack_| container. \verb|Addr| is an integer type alias specifically designated for representing virtual address line numbers. \verb|Bucket| is another custom structure designed for collecting and categorizing cache hit statistics.

#### 5.2 Bucket System for Reuse Distance Tracking

这一段可能要移到第四章, 用来描述统计方法. 又或者在这里加上具体的 miss 统计公式

The concept of employing a bucket system to track and analyze reuse distance was proposed by [Kim et al. (1991)]. In Listing 5.1, the \verb|buckets_| variable is implemented as a vector consisting of multiple buckets. Each bucket contains a parameter named \verb|mindist|, denoting the minimal distance.

Consider a processor configuration with a 32 KiB L1 cache, a 512 KiB L2 cache, no L3 cache, and a cache line size of 64 bytes. In this bucket system, the \verb|buckets| vector comprises four buckets with \verb|mindist| values of 0, 512, 8192, and INF. These four buckets correspond to the L1 cache range, the L2 cache range, cache misses, and an infinite distance category. The minimal distances for the second and third buckets are derived from the L1 capacity divided by the cache line size and the L2 capacity divided by the cache line size, respectively.

图?

 If a cache block is assigned to a particular bucket, it indicates that the block’s stack distance is greater than or equal to the current bucket’s \verb|mindist| and less than the \verb|mindist| of the next bucket. For example, if a cache block exhibits a stack distance of 512, the count in the third bucket—the bucket with a \verb|mindist| of 8192—is incremented. This implies that, under the fully associative cache assumption, the access occurred within the L2 cache range, thereby imcreasing an L2 hit.


#### 5.3 Address Mapping

This cache simulator did not employ actual SpMV computations, instead, utilizes the virtual address mapping solution designed for SpMV cache partitioning in [Brei20]. The SpMV workload are systemetically allocated to distinct regions of the virtual cache line space. The vector x, which contains the input values, is mapped to cache lines starting from zero. The row pointer array, which stores the starting indices for each row in the sparse matrix, follows immediately after the vector x. The output vector y and the matrix values array are then mapped to subsequent cache line regions. Finally, the column index array, which stores the column positions of non-zero elements, occupies the highest cache line numbers in our virtual address space.

[Figure cite]

The \verb|cline()| function serves as the convertor of the address mapping system. This function calculates the required offset by locating the first set bit in the cache line size divided by the data type size, then shifts the memory index right by that number of bits to obtain the cache line number. 

Listing 5.2
```cpp
template <typename T, size_t CLSIZE>
Addr cline(uint64_t idx)
{
    int x = CLSIZE / sizeof(T);
    
    int n = 0;
    while ((x & 1) == 0) {
        x >>= 1;
        n++;
    }

    static auto first_bit_set = n;
    return static_cast<Addr>(idx >> first_bit_set);
}
```

Listing 5.2 demonstrates the code principles of \verb|cline()| function. In the actual program, constant expression grammar is employed to prevent redundant computations. The template parameter T represents the data type of values within the matrix, while CLSIZE denotes the cache line size. The function returns a virtual line address, which can be utilized for subsequent cache access simulation.

#### 5.4 LRU Replacement Policy

This cache simulator employs the most common LRU algorithm. In addition to moving the newest memory block to the top of the \verb|stack_| during each cache access, the simulator also performs additional adjustments based on the bucket system.

As mentioned in Listing 5.1, the \verb|stack_| member variable is a list container holding \verb|MemoryBlock| structures, with each \verb|MemoryBlock| simulating a cache block. Within this structure, a \verb|bucket_idx| integer variable records the bucket index where the cache block should reside. The \verb|handle_cline()| function is an entry of address handling. When the cache simulator attempts to access a cache block at address x, it first uses \verb|refmap_.find(x)| to obtain the iterator for that cache block within \verb|stack_|. It then processes the block using two functions: \verb|on_block_seen()| for blocks already present in the cache history, and \verb|on_block_new()| for blocks that have never entered the cache.

加一个 handle_cline()

Listing 5.3
```pseudo
function on_block_seen(iterator it):
    
    // Record current bucket index
    bucket = it->bucket_idx
    result = {bucket}
    
    // Move all bucket markers below current block's bucket
    move_markers(bucket)
    
    stack.splice(stack.begin(), stack, it)  
    it->bucket_idx = 0
    
    return result  // Return bucket index for statistics
```

For cache blocks that have been previously encountered, the \verb|on_block_seen()| function takes a stack iterator as input and returns the bucket index for statistical analysis. This function first retrieves the current bucket index of the accessed cache block, then invokes \verb|move_markers()| to adjust the bucket indices of other cache blocks in the stack accordingly. Subsequently, it resets the bucket index of the accessed block to 0, signifying that this block now belongs to the topmost bucket in \verb|buckets_|. Following standard LRU replacement policy, the cache block is relocated to the top of the stack using the \verb|splice| operation. The function's return value indicates which bucket's access counter should be incremented in the cache simulator. Listing 5.3 presents the pseudocode for the \verb|on_block_seen()| function.

Listing 5.4 presents the pseudocode for the \verb|on_block_new()| function. In contrast to \verb|on_block_seen()|, this function constantly processes newly instantiated blocks, which are initialized with a bucket index of 0. After inserting a new block onto the stack, the function evaluates whether to activate the next bucket based on the current stack size and predefined distance thresholds. The function returns an iterator pointing to the newly inserted block. Following the execution of this function, the bucket corresponding to cache misses (infinite reuse distance) is incremented accordingly.

Listing 5.4
```pseudo
function on_block_new(memory_block mb):
    stack.push_front(mb)
    
    // Move all active bucket markers upward
    move_markers(next_bucket - 1)
    
    // Check if next bucket should be activated
    if stack.size > min_distance[next_bucket]:
        activate_next_bucket()
    
    return stack.begin()  // Return iterator to new block
```
#### 5.5 Multi-Threading Support

In this cache simulator, the \verb|SharedCache| class, which inherits from the \verb|Cache| base class, manages caches shared across multiple threads. To support parallel execution of SpMV, the simulator employs the Mellor-Crummey and Scott (MCS) Lock technology and OpenMP framework.
#### 5.5.1 Mellor-Crummey and Scott Lock

The Mellor-Crummey and Scott(MCS) lock[cite] is a variant of the spin lock specifically designed to minimize cache coherence traffic in high-contention scenarios. Unlike traditional spin locks, which notify all waiting threads when the lock is released—thereby triggering the Thundering Herd effect—the MCS lock maintains a FIFO queue and only notifies the next thread in line. Furthermore, each thread spins only on its own locally allocated variable, significantly reducing unnecessary cache coherence overhead.

The \verb|SharedCache| class contains an \verb|mcslock_| member variable, implemented as an MCS lock class that leverages the C++ atomic library for all synchronization operations. As demonstrated in Listing 5.5, this code example allows concurrent access to multiple cache addresses and effectively prevents resource contention.

Listing 5.5 Using MCS Lock to handle three cache accesses together
```cpp
MCSLock mcslock_;

void handle_clines_shared(int tid, Addr a0, Addr a1, Addr a2)
{
    mcslock_.lock(tid);
    handle_cline(a0);
    handle_cline(a1);
    handle_cline(a2);
    mcslock_.unlock(tid);
}

```

#### 5.5.2 OpenMP

The OpenMP parallel programming framework is integrated into this cache simulator through the inclusion of the \verb|omp.h| header file, which provides access to OpenMP's thread management functions.

The implementation employs several key OpenMP constructs: \verb|#pragma omp parallel| creates parallel regions where each thread simulates independent cache behavior using private cache instances. The \verb|#pragma omp for schedule(static)| directive distributes matrix rows evenly among threads, mimicking typical SpMV parallelization strategies. Synchronization is achieved through \verb|#pragma omp barrier| to coordinate timing measurements and \verb|#pragma omp single| to ensure single-threaded execution of critical sections like time recording. Thread-safe cache access is managed through \verb|#pragma omp critical| sections when writing simulation results to CSV files. 

To support shared cache simulation across multiple threads, an array of SharedCache class instances is created that represents all shared cache instances available on the target CPU architecture. Each thread is assigned to a specific shared cache instance based on its thread ID, ensuring that multiple threads can share the same cache while maintaining thread-safe access through appropriate synchronization mechanisms. The \verb|omp_get_thread_num()| function returns the unique identifier of the currently executing thread within the parallel region. The allocation of threads to shared caches is implemented using a simple mapping function that divides the thread ID by the number of threads per shared cache, as illustrated in Listing 5.6.

Listing 5.6
```cpp
#include <omp.h>

std::array<SharedCache, num_shared_caches> shared_caches{};

#pragma omp parallel
    {
        int tid = omp_get_thread_num();
        SharedCache &sc = shared_caches[tid / threads_per_shared_cache];
        
        #pragma omp for schedule(static)
        for (/* condition */) {
        
            /* ... distributed work ... */
            
        }
    }
```
cap: In this project, the distributed work is the cache access handling.

#### 5.6 Cache Simulator Extended with Set-associativity

A key contribution of this research is the enhancement of the reuse distance-based cache simulator. Originally designed to measure cache misses in fully associative cache systems, the simulator was extended to support set-associative cache systems. This enhancement was achieved through three main objectives: (1) the implementation of a set-associative cache structure to simulate real-world n-way caches, (2) the modification of the original bucket system to enable counting of conflict misses, and (3) the development of a processing mechanism that handles cache accesses in the original program while simultaneously simulating their behavior within the set-associative cache structure.

#### 5.6.1 Set-associative Cache Structure

The set-associative cache structure is implemented using arrays of PrivateCache instances to simulate individual cache sets. The number of cache sets for each cache level is calculated based on the cache capacity, associativity, and cache line size. The calculation follows the standard cache design formula where the number of sets equals the cache capacity divided by the product of associativity and cache line size.

For private caches, the implementation creates separate arrays where each element represents a single cache set. The implementation is shown in Listing 5.7, assuming L1 and L2 caches are private:

Listing 5.7
```cpp
// Calculate number of cache sets
#define L1_NSETS (L1_CAPACITY / (L1_WAYS * CACHE_LINE_SIZE))
#define L2_NSETS (L2_CAPACITY / (L2_WAYS * CACHE_LINE_SIZE))

#pragma omp parallel
{
    // Create arrays of cache with cache sets for each thread
    auto l1_cache = std::vector<PrivateCache>(L1_NSETS);
    auto l2_cache = std::vector<PrivateCache>(L2_NSETS);
}
```

For shared caches, the method for calculating the number of cache sets remains the same. Assuming that in a certain processor, the L3 cache is shared, with a total of \verb|num_shared_caches| shared cache blocks, and every \verb|threads_per_shared_cache| threads share one shared cache block, then the L3 cache can be implemented and allocated using the code in Listing 5.8:

```cpp
#define L3_NSETS (L3_CAPACITY / (L3_WAYS * CACHE_LINE_SIZE))

// Create arrays of shared cache with cache sets
std::array<std::vector<SharedCache>, num_shared_caches> l3_shared_caches{};
for (int i = 0; i < num_shared_caches; i++) {
    l3_shared_caches[i] = std::vector<SharedCache>(L3_NSETS);
}

#pragma omp parallel
{
    // Acquire current thread number
    int tid = omp_get_thread_num();
    
    // Allocate shared caches for each thread
    auto& l3c = l3_shared_caches[tid / threads_per_shared_cache];
}
```


调整后的结构 uml 示意图

#### 5.6.2 Modification of Bucket system

As introduced in Section 5.2, the original bucket system assigns each bucket a \verb|min_dist| attribute, which denotes the minimum reuse distance of cache blocks within that bucket, while also serving as a statistical container.

To adapt this system to a set-associative cache, specifically, to track and quantify conflict misses under set-associative mappings, the \verb|min_dist| values must be replaced with the number of ways at each cache level. For instance, consider an L1 cache with 4-way associativity, an L2 cache with 4-way associativity, and an L3 cache with 8-way associativity. In this case, the corresponding \verb|min_dist| values for the buckets would be 0, 4, 8, and ∞. The L1 and L2 caches share the same number of ways, however, duplicate buckets are unnecessary.

#### 5.6.3 Cache Access Handling in Sets

The allocation of a memory address to a specific cache set is determined through a modulo operation, where the address is divided by the number of cache sets. The resulting remainder identifies the set responsible for handling the access. For each cache level, the set index is computed as follows:

$$ set\ index = address\ \mod\ number\ of\ sets\ in\ cache$$

Listing demonstrated the code used in the project, assuming private L1 and a shared L2 cache. In the base program, each location \verb|handle_cline()| is invoked to process a cache access, \verb|handle_cline_in_set()| is invoked for set-specific handling.

Listing x
```cpp
void handle_cline_in_set(int tid, Addr addr, 
    std::vector<PrivateCache> &l1c, std::vector<SharedCache> &l2c)
{
    int l1_set_index = addr % L1_NSETS;
    int l2_set_index = addr % L2_NSETS;
    
    l1c[l1_set_index].handle_cline(addr);
    l2c[l2_set_index].handle_cline_shared(tid, addr);
}

```

#### 5.6.4 Parallel handling

As outlined in Section 5.5.1, the program initially intended to use MCS Lock to process multiple cache accesses simultaneously within a critical section. However, due to structural constraints in the program design, this approach was abandoned. Instead, the implemented version processes only one cache access at a time within the shared cache.

The function responsible for handling an access within a cache set is named \verb|handle_cline_in_set()|. For every cache access processed in the original program via \verb|handle_cline()| or \verb|handle_cline_shared()|, the modified implementation now invokes \verb|handle_cline_in_set()| once. This ensures that the frequency of cache access processing remains consistent with the original program, thereby minimizing potential cache inconsistencies introduced by multi-threaded handling. Given that our research does not focus on the efficiency of the cache simulator, the additional computational overhead is considered acceptable.

Listing x shows the source code of the \verb|handle_cline_in_set()| function, while Listing y illustrates the handling of a specific cache access, including the calculation of the virtual address and the subsequent function calls. The method for determining the virtual address has been described previously in Section 5.3.

Listing y
```cpp
    auto cl_row = cl_row_start + cline<rowptr_t, MEMBLOCKLEN>(first_row);
    pc.handle_cline(cl_row);
    sc.handle_cline_shared(tid, cl_row);
    handle_cline_in_set(tid, cl_row, l1c, l2c);
```


#### 5.6.5 Statistics Collection

Since a \verb|std::vector<Cache>| is used to model a cache with multiple sets, the counts of non-conflicted cache hits are distributed across the individual elements of the vector. To aggregate these statistics, a new function named \verb|print_set_assoc_statistics()| was implemented.

This function first calculates the \verb|working_set_size|, defined as the total number of unique cache lines across all sets, which is used for validation purposes. It then employs a two-level nested loop to accumulate the counts from each cache set, producing aggregated memory access statistics per reuse distance bucket. Finally, the results are printed using a single loop. The source code of this function is provided in Listing z.

```cpp
void print_set_assoc_statistics(FILE *file, const auto& matrix, std::vector<Cache>& cache_sets, const char* level, int id, double time, int shared) {
    
    size_t bucket_size = Bucket::min_dists.size();
    
    unsigned long working_set_size = 0;
    std::vector<unsigned long> counts(bucket_size, 0);
    
    for (size_t i = 0; i < cache_sets.size(); i++) {
        working_set_size += cache_sets[i].get_stack_size();
        for (size_t j = 0; j < bucket_size; j++) {
            counts[j] += cache_sets[i].get_buckets()[j].access_counts.count;
        }
    }
    
    for (size_t i = 0; i < bucket_size; i++) {
        /* ... print results to a csv file ... */
    }
}
```

#### python analysis
