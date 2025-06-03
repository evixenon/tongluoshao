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

#!/bin/bash

# settings
BASE_URL="http://sparse-files.engr.tamu.edu/MM"
MTX_LIST="ss490matrices.txt"
OUTPUT_DIR="/home/nk/data/mtx/suitesparse"

# -p: parent, create the dir parent if needed
# also, create dir if not exist, ignore when exist
mkdir -p "$OUTPUT_DIR"

while read -r group name
do
    group=$(echo $group | tr -d [:space:]) # delete space
    name=$(echo $name | tr -d [:space:])
    
    file_dir="$OUTPUT_DIR/$group" 
    mkdir -p "$file_dir"
    
    # # -nv: not verbosely
    # # -c: continue when interrupted
    wget -c -nv -P "$file_dir" "$BASE_URL/$group/${name}.tar.gz"
    
    # # extract and remove redundant files
    tar xf "${file_dir}/${name}.tar.gz" --directory="$file_dir"
    rm "${file_dir}/${name}.tar.gz"
    mv "$file_dir/$name/*.mtx" "$file_dir"
    if [ $? -eq 0 ]; then
        rm -r "$file_dir/$name"
    fi
done < "$MTX_LIST"
