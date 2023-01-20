import { serve } from 'https://deno.land/std@0.173.0/http/server.ts';
import { connect } from 'https://deno.land/x/redis@v0.29.0/mod.ts';
import { allowedCommands } from './commands.ts';

const config = {
  redis: {
    hostname: Deno.env.get('REDIS_HOST') || 'localhost',
    port: Number(Deno.env.get('REDIS_PORT')) || 6379
  },
  server: {
    port: Number(Deno.env.get('PORT')) || 3000,
    hostname: Deno.env.get('HOST') || '0.0.0.0'
  }
};

const redis = await connect(config.redis);

console.log(`Connected to redis at ${config.redis.hostname}:${config.redis.port}`);

class JSONResponse<T> extends Response {
  constructor(body: T, init?: ResponseInit) {
    super(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' }, ...init });
  }
}

class BadRequestResponse extends JSONResponse<{ error: true; result: string }> {
  constructor(result: string) {
    super({ error: true, result }, { status: 400 });
  }
}

const responses = {
  ok: new JSONResponse({ error: false, result: 'ok' }),
  notFound: new JSONResponse({ error: true, result: 'Not found' }, { status: 404 }),
  commands: new JSONResponse(allowedCommands)
};

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  switch (request.method) {
    case 'GET':
      switch (pathname) {
        case '/health':
          return responses.ok.clone();
        case '/commands': {
          return responses.commands.clone();
        }
      }
      break;
    case 'POST':
      switch (pathname) {
        case '/command': {
          // Ensure request is json
          if (!request.headers.get('Content-Type')?.includes('application/json')) {
            return new BadRequestResponse('Request must be json');
          }

          // Ensure command is present
          const body = await request.json();
          if (!body.command) {
            return new BadRequestResponse('Command must be present');
          }

          // Ensure command is a string
          if (typeof body.command !== 'string') {
            return new BadRequestResponse('Command must be a string');
          }

          const cmd = (body.command as string).trim();

          // Ensure command is not empty
          if (cmd.length === 0) {
            return new BadRequestResponse('Command must not be empty');
          }

          // Ensure command is not too long
          if (cmd.length > 1024) {
            return new BadRequestResponse('Command must not be longer than 1024 characters');
          }

          console.log('COMMAND', cmd);

          const [name, ...args] = cmd.split(' ');

          // Ensure command is allowed
          if (!allowedCommands.includes(name.toLowerCase())) {
            console.warn(`Command ${name} is not allowed`);
            return new BadRequestResponse(`Command "${name}" is not allowed`);
          }

          return redis
            .sendCommand(name, ...args)
            .then((result) => (console.log(result), new JSONResponse({ error: false, result: result.value() })))
            .catch((err) => new JSONResponse({ error: true, result: err.message }));
        }
      }
      break;
  }

  return responses.notFound.clone();
}

serve(handleRequest, config.server);
