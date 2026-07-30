FROM oven/bun:1 AS base
WORKDIR /app

# Install deps first (better layer caching)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy rest of the source
COPY . .

# Cloud Run listens on $PORT (defaults to 8080)
ENV NODE_ENV=production
EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]