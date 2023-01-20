FROM denoland/deno:alpine

EXPOSE 3000

WORKDIR /app

USER deno

# Preload libs
RUN deno eval "import { serve } from 'https://deno.land/std@0.173.0/http/server.ts'; console.log('Loaded server lib', void serve)"
RUN deno eval "import { connect } from 'https://deno.land/x/redis@v0.29.0/mod.ts'; console.log('Loaded redis lib', void connect)"

COPY commands.ts /app
COPY main.ts /app

CMD ["run", "--allow-net", "--allow-env", "main.ts"]
