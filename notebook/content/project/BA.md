---
title: BA
date: 2024-10-09
tags:
---
## Prepare and Config

##### git ssh
-  Ubuntu 24 user.email: nuohengluo@qq.com

通过 `ssh-keygen -t rsa -C 邮箱` 生成的 rsa 在
```
Your identification has been saved in /home/nk/.ssh/id_rsa
Your public key has been saved in /home/nk/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:2gStlQbeNsbwGLsmHzbtCekFYYehJnbEtvIFEyDuhCI nuohengluo@qq.com
The key's randomart image is:
+---[RSA 3072]----+
|. .oo.Bo.        |
|o. .=+.& .       |
|Eoo.++* %        |
|=..+. .% .       |
| . o..X S        |
|    .* X .       |
|      + +        |
|                 |
|                 |
+----[SHA256]-----+
```

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCqRKdNEi0BdbS4d4vL5N27pEPi65fbbySJ4JFyy8Kcxc2StMsqJFmyG7PWOvsz3k3RCkNlRFunIbLerX7bucTry9V9+66kVVFhH28o+TAzSGvbOsyR5GV7Dtdl3qLhiNZjrwgO0bnT2LYioVNShhzsLFguNE5D6SIGk5gwXjLC7dew/avQ6jYyaG+7xIPHMETu1Bgl3kTy2l8EEtowz5/WKTWRy5maCrP7iio+fsfTbl3CGv1jowBG3e0pWiU9mUP+x6sNqyBZVntzeQi83Uz2rKCLdxM9ErVvbEQY+e61axlCC8v+xNuLgz9yIkAfikjWkKrBisNiopN4TeXWEq0eTmxAF8M1JA2Ld7G7LkXOKHKjQt/Nfw7+xcA3CEReKacehbswuPGlerb4ZBj//4TDCTZiwU+k1Dgm6u9ISMqWZmcLFgXQtiZCIs6awarTToOmzKF100FCkMZV1ZzN/lfYHTYIukOYgs/1bEqvYgiRJGB2dSKpvwpvRhgISfn3E6E= nuohengluo@qq.com
```


## Collect Materials

- you should cite it if your use their matrices [About | SuiteSparse Matrix Collection](https://sparse.tamu.edu/about)

cpu uses SRAM

The stack distance algorithm is based on [Kim et al. 1991](https://dl.acm.org/doi/pdf/10.1145/107972.107995)

## Comments

#### makefile
This is a Makefile for building a C++ program called `spmvrd` (likely "Sparse Matrix-Vector Multiplication with Reordering"). Let me break it down section by section:

##### Basic Configuration

```makefile
SHELL:=/bin/bash
BIN:=spmvrd
```

Sets the shell to bash and defines the final executable name as `spmvrd`.

##### File Discovery

```makefile
HEADERS:=$(wildcard *.h)
SOURCES:=$(wildcard *.cpp)
OBJECTS:=$(SOURCES:.cpp=.o)
```

Automatically finds all `.h` header files and `.cpp` source files in the current directory, then creates a list of corresponding `.o` object files.

##### Compiler Flags

The `CXXFLAGS` are built up incrementally:

**Performance flags:**

- `-std=c++20`: Use C++20 standard
- `-fopenmp`: Enable OpenMP for parallel processing
- `-Ofast`: Aggressive optimization (faster than `-O3`)
- `-march=native -mtune=native`: Optimize for the current CPU architecture
- `-flto`: Link-time optimization

**Build configuration:**

- `-DNDEBUG`: Disable debug assertions
- `-g3`: Include debug symbols (maximum level)

**Warning flags:**

- `-Wall -Wextra -Wpedantic`: Enable comprehensive warnings
- Multiple `-Wno-*` flags to disable specific warnings that are apparently not relevant for this codebase

**Commented-out options:**

- Profiling flags (`-pg -fno-inline`)
- Additional strict warnings (`-Weffc++`, `-Wconversion`)
- Sanitizers for debugging (undefined behavior, address, thread)

##### Hardware-Specific Optimization

```makefile
CXXFLAGS+=-DMEMBLOCKLEN=$(shell getconf LEVEL1_DCACHE_LINESIZE)
CXXFLAGS+=-DCACHE_LINESIZE=$(shell getconf LEVEL1_DCACHE_LINESIZE)
```

These dynamically determine the CPU's L1 data cache line size and pass it as preprocessor definitions. This allows the code to optimize memory access patterns for the specific hardware it's running on.

##### Build Rules

```makefile
$(BIN): $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LDFLAGS)

%.o: %.cpp $(HEADERS)
	$(CXX) $(CXXFLAGS) -c $< -o $@
```

Standard pattern: compile each `.cpp` file to a `.o` object file, then link all objects into the final executable. Object files depend on all headers, so changing any header will trigger recompilation.

This Makefile is clearly for a high-performance computing application, likely involving sparse matrix operations, with careful attention to CPU optimization and parallel processing.

These are **automatic variables** in Make that represent different parts of the current rule:

##### automatic variables
###### `$@` - Target

The name of the target (what's being built)

```makefile
$(BIN): $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LDFLAGS)
```

Here `$@` expands to `$(BIN)`, which is `spmvrd`. So this becomes:

```bash
g++ [flags] [objects] -o spmvrd [ldflags]
```

###### `$^` - All Prerequisites

All the dependencies/prerequisites of the target

In the same rule, `$^` expands to `$(OBJECTS)`, which might be something like `main.o utils.o matrix.o`. So the full command becomes:

```bash
g++ [flags] main.o utils.o matrix.o -o spmvrd [ldflags]
```

###### `$<` - First Prerequisite

The first (or only) dependency

```makefile
%.o: %.cpp $(HEADERS)
	$(CXX) $(CXXFLAGS) -c $< -o $@
```

For a specific file like `main.cpp`, `$<` expands to `main.cpp` (the first prerequisite), while `$@` expands to `main.o`. This becomes:

```bash
g++ [flags] -c main.cpp -o main.o
```

###### Why Use These?

They make Makefiles more maintainable and less error-prone:

- No need to repeat target/dependency names
- Rules work generically for pattern matching (like `%.o: %.cpp`)
- Less chance of typos when copying similar rules

Other common automatic variables include `$?` (prerequisites newer than target) and `$*` (the stem of pattern rules).