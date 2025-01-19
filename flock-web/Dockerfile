FROM denoland/deno:1.40.2

WORKDIR /app

# Cache the dependencies
COPY deno.json .
COPY import_map.json* .
RUN deno cache --import-map=import_map.json main.ts

# Copy source code
COPY . .

# Compile the project
RUN deno cache main.ts

EXPOSE 3000

CMD ["run", "-A", "main.ts"] 