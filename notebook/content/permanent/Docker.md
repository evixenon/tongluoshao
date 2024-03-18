---
title: Docker
date: 2023-11-27
tags:
  - Docker
---


## Intro

#### What is Docker?
- a platform that **automates the deployment, scaling, and management of applications** by isolating them into lightweight, portable containers
#### What is container? 
- software environment

#### Why container?
- bare metal not flexible
- virtual machines too heavy

#### Docker and OCI?
- OCI = Open Container Initiation
- Docker played a pivatol role in shaping the standards for container format and runtime
- OCI specification: runtime-spec + image-spec
    - Docker: Docker Engine + Docker Image

#### Installation

[Install Docker Engine on Ubuntu | Docker Docs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)

[Install Docker Desktop on Windows | Docker Docs](https://docs.docker.com/desktop/install/windows-install/)

> **Important**
> To run Windows containers, you need Windows 10 or Windows 11 Professional or Enterprise edition. Windows Home or Education editions only allow you to run Linux containers.

Win 需要先安装和更新 wsl 
```powershell
wsl --install
wsl --update
```

## Underlying Mechanisms

#### cgroup/control group
- a linux kernel feature that allow you to **allocate or manage computer resources**(CPU, memory, bandwidth, I/O ...)

- pros
    - Resources isolation: avoid negative affects (on resources) from other container
    - can mannually limit resources usage
    - monitering
    - can give priority to certain container

#### Namespaces
- Linux kernel features allows the **isolation of system resources**
- types of namespaces:
    - PID
    - NET(network)
    - MNT(mount)
    - UTS(UNIX Tims Sharing System)
    - USER
    - IPC(Inter-Process Communication)
- docker creates a set of namspaces when a container is started, so that
    - the container is portable
    - without conflicts or interferences from other container

#### Union Filesystems
- creates virtual, layered file structure
- enables simultaneous mounting of multiple directories on a single mount point, keeping the containers seperate
- essential features:
    - *Layered structure* multiple read-only layer + a top writable layer
    - *Copy-on-Write* the system creates a copy of the file in writable layer when the file needs changes
    - *Resources Sharing* containers share common base layer while running separately
    - *Fast Container Initialization* Union filesystems make it possible to create new containers instantly by merely creating a new writable layer on existing read-only layers.

Popular UnionFS in Docker:
- [**AUFS (Advanced Multi-Layered Unification Filesystem)**](http://aufs.sourceforge.net/), widely used as Docker storage driver
- [**OverlayFS (Overlay Filesystem)**](https://www.kernel.org/doc/html/latest/filesystems/overlayfs.html), simplified creation and management of overlayed directories compare to AUFS.
- [**Btrfs (B-Tree Filesystem)**](https://btrfs.wiki.kernel.org/index.php/Main_Page) advanced storage features like snapshots and checksumming
- [**ZFS (Z File System)**](https://zfsonlinux.org/), provides union filesystem features along with data protection, compression, and deduplication

## Basics

### Docker Component
- **Dockerfile**: A text file containing instructions (commands) to build a Docker image.
- **Docker Image**: A snapshot of a container, created from a Dockerfile. Images are stored in a registry, like Docker Hub, and can be pulled or pushed to the registry.
- **Docker Container**: A running instance of a Docker image.

### Docker Command
- `docker pull <image>`: Download an image from a registry, like Docker Hub.
- `docker build -t <image_name> <path>`: Build an image from a Dockerfile, where `<path>` is the directory containing the Dockerfile.
- `docker run -d -p <host_port>:<container_port> --name <container_name> <image>`: Run a container from an image, mapping host ports to container ports.

- `docker image ls`: List all images available on your local machine.
- `docker image rm <image>`: Remove an image from your local machine.

- `docker container ls`: List all running containers.
- `docker container stop <container>`: Stop a running container.
- `docker container rm <container>`: Remove a stopped container.

PS: docker-compose commands are also important

### Data Persistence in Docker
- Containers are *ephemeral* by default, which means any data stored in the container will be lost once it is terminated
- to store data permanently, there are 3 ways:

#### Docker Volumn
- a volumn is a directory on the host machine. Docker can use it to store files or directories

To **create** a volume, use the following command:
```
docker volume create volume_name
```

To **use** a volume, add a `--volume` (or `-v`) flag to your `docker run` command:
```
docker run --volume volume_name:/container/path image_name
```

or Using `--mount`
```
docker run -d --mount source=my-volume,destination=/data your-image
```

to **inspect** the details of volume
```
docker volume inspect volume_name
```

**remove**
```
docker volume rm my-volume
```

- a volume can be mounted in different containers at the same time

#### Bind Mount
- Bind mounts allow you to map any directory on the host machine to a directory within the container

To create a bind mount, use the `--mount` flag with `type=bind` in your `docker run` command:
```
docker run --mount type=bind,src=/host/path,dst=/container/path image_name
```

- Bind Mount 在主机的绝对目录, Volumn 在 Docker 的管理下并在 Docker 的存储空间
#### Docker tmpfs mounts
- Docker tmpfs mounts allow you to create a temporary file storage directly in the container’s memory. Data stored in tmpfs mounts is fast and secure but will be lost once the container is terminated.
- useful for cases where just the persistence of data within the life-cycle of the container is required.

To use a tmpfs mount, add a `--tmpfs` flag to your `docker run` command:

```
docker run --tmpfs /container/path image_name
```

## Image

### Using Third-Party Images

#### How to find?
- search in Docker Hub

#### Use third-party image in docker file
`FROM image-name`

e.g. 
```
FROM node:14
# The rest of dockerfile
```

#### Example: using database in docker

MySQL

```
docker search mysql
docker pull mysql
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql
```
- `--name` container name
- `-e` specify environmental parameter
- `-p` host:vm vm端口映射到主机
- `-d` from which image

PostgreSQL
```
docker run --name some-postgres -e POSTGRES_PASSWORD=my-secret-pw -p 5432:5432 -d postgres
```

MongoDB
```
docker run --name some-mongo -p 27017:27017 -d mongo
```

#### Interactive Test Environment
- Goal: much easier to work with third party software, test different dependencies or versions, and quickly experiment without the risk of damaging your local setup

**create**
```
docker run -it --rm python
```
- `-it` interative mode with tty
- `--rm` remove the container once it is stopped
- then you can pip, print or test any python

more examples
```
docker run -it --rm node
```

```
docker run -it --rm ruby
```

```
docker run -it --rm --name temp-mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -p 3306:3306 mysql
```

#### Command Line Utilities

##### BusyBox
- provides a large amount of common unix utilities, such as `awk`, `grep`, `vi`, etc
- just like you would on a regular command line

To run BusyBox inside a Docker container, you simply need to pull the image and run it with Docker:
```
docker pull busybox
docker run -it busybox /bin/sh
```

##### cURL
- transfer data using various network protocols
- often used for testing APIs or downloading files from the internet
 
```
docker pull curlimages/curl
docker run --rm curlimages/curl https://example.com
```

##### other
- `wget`: A free utility for non-interactive download of files from the Web.
- `imagemagick`: A powerful software suite for image manipulation and conversion.
- `jq`: A lightweight and flexible command-line JSON processor.

### Building Container Images
Container image is a executable package including all things to run an application. Including:
- code
- runtime
- system tools
- libraries
- settings

#### Dockerfile 
It is essentially a script containing instructions on how to assemble a Docker image.

##### Dockerfile Example
```dockerfile
# Use an official Python runtime as a parent image
FROM python:3.7-slim

# Set the working directory to /app
# for: RUN, CMD, ENTRYPOINT, COPY, ADD
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

##### Common Dockerfile Instructions
- `FROM` set the base image
- `WORKDIR` set working dir (RUN, CMD, ENTRYPOINT, COPY, ADD). If dir do not exists, create.
- `COPY` copy from host dir, to container's file system.
- `ADD` COPY + handle remote URLs and automatically unpack archives.
- `CMD` command when running a container
- `ENTRYPOINT` CMD but the container as excutable with params
- `EXPOSE` the container will listen on which port(s)
- `ENV` set env var for the container

Each instruction in the Dockerfile creates a new layer in the image.

#### Build from Image
**Build** from image
```
docker build -t your-image-name .
```

**inspect** the created image
```
docker image ls
```

inspect **individual layers** of an image
```
docker history your-image-name
// or
docker inspect your-image-name
```

**remove**
```
docker image rm your-image-name
```

**Pushing** Images to a Registry
- login, tag, push
```
docker login
docker tag your-image-name username/repository:tag
docker push username/repository:tag
```

#### Efficient layer caching
- Docker creates a new layer for each instruction
- The existing cached layers will be *reused* when:
    - the *instruction hasn't changed* since the last build
    - or *none of the layers is affected* by changed

Tips/Best practices
- **Minimize changes in the Dockerfile**
    - minimize frequency of changes in the Dockerfile
    - most frequently changed lines appear at the bottom
- **Build context optimization**
    - use `.dockerignore`
- **Use smaller base images**
    - smaller image = less number of layers need to be cached
- `--cache-from`
    - specify which image to use as a cache src.
- **Combine multiple instructions**

[Docker Layer Caching](https://docs.docker.com/build/cache/)

#### Image Size and Security

Smaller image size ->
- faster build
- reduced network overhead when downloading

##### Reducing image size

- use an appropriate base image
    - consider alpine variant
```eg0
FROM node:14-alpine
```

- Run multiple commands in a single `RUN` statement

```eg1
RUN apt-get update && \
    apt-get install -y some-required-package
```

- Remove unnecessary file in the same layer
    - remove temporary or unused files in the same layer to reduce the final image size

```
RUN apt-get update && \
    apt-get install -y some-required-package && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

- Use multi-stage builds
    - use multiple `FROM` statements, each `FROM` statement creates a new stage
    - copy files from one stage to another using the `COPY --from` statement

```
FROM node:14-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["npm", "start"]
```


- Use `.dockerignore`
    - to exclude files

```
node_modules
npm-debug.log
```

##### Enhancing Security
- Keep base images updated

- Always use a non-root user when running containers
```
RUN addgroup -g 1000 appuser && \
    adduser -u 1000 -G appuser -D appuser
USER appuser
```

- Limit scope of `COPY` and `ADD`

```
COPY package*.json ./
COPY src/ src/
```

- Scan images for vulnerabilities
    - tools like [Anchore](https://anchore.com/) or [Clair](https://github.com/quay/clair)
## Container

