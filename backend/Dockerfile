FROM oven/bun:1.2.21-alpine

WORKDIR /app

COPY package.json bun.lock tsconfig.json ./
RUN bun install --frozen-lockfile

COPY src ./src
COPY drizzle ./drizzle

EXPOSE 10000

CMD ["bun", "run", "src/index.ts"]