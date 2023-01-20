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
docker build -t redis-fetch-server .
docker run -p 3000:3000 -e REDIS_HOST=redis -e REDIS_PORT=6379 redis-fetch-server
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

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
