[![Build](https://img.shields.io/github/actions/workflow/status/open-workers/redis-fetch-server/build.yml?logo=deno&label=Package+build)](https://github.com/open-workers/redis-fetch-server/actions/workflows/build.yml)

# Redis fetch server

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
