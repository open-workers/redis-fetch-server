[github-license-url]: /LICENSE
[action-docker-url]: https://github.com/open-workers/redis-fetch-server/actions/workflows/docker.yml

# Redis fetch server

[![License](https://img.shields.io/github/license/maxx-t/nginx-jwt-module.svg)][github-license-url]
[![Build Status](https://github.com/open-workers/redis-fetch-server/actions/workflows/docker.yml/badge.svg)][action-docker-url]

A simple server that interfaces Redis with HTTP

## Usage

#### With deno

```bash
deno run --allow-net --allow-env main.ts
```

#### With docker

```bash
docker pull ghcr.io/open-workers/redis-fetch-server:latest
docker tag ghcr.io/open-workers/redis-fetch-server:latest redis-fetch-server
# or
docker build -t redis-fetch-server .

docker network create redis-fetch-net
docker run --rm --net redis-fetch-net --name redis redis:alpine
docker run --rm --net redis-fetch-net -p 3000:3000 -e REDIS_HOST=redis redis-fetch-server
```

## Environment variables

The following environment variables are used and can be overwritten:

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
HOST=0.0.0.0
PORT=3000

# PORT=1234 deno run --allow-net --allow-env main.ts
# docker run -p 3000:3000 -e REDIS_HOST=redis redis-fetch-server
```

## License

This package is licensed under the MIT License. See the [LICENSE][github-license-url] file for more details.
