FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g turbo

FROM base AS builder
COPY . .
RUN turbo prune --scope=@homebridge/api --docker

FROM base AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

FROM installer AS sourcer
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=@homebridge/api...

FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
COPY --from=sourcer --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=sourcer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=sourcer --chown=nestjs:nodejs /app/packages ./packages
USER nestjs
EXPOSE 3001
CMD ["node", "dist/main"]
