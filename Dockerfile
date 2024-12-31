FROM node:18.20-alpine AS base

FROM base as base_with_env_vars
ARG STRAPI_AUTH_TOKEN
ENV AUTH_TOKEN=$STRAPI_AUTH_TOKEN

FROM base AS next_deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base_with_env_vars AS next_builder
WORKDIR /app
COPY --from=next_deps /app/node_modules ./node_modules
COPY . .
# RUN ["eval", "$(node set-auth-token.mjs)"]
# RUN echo $(node set-auth-token.mjs)
# RUN echo ${AUTH_TOKEN}
# RUN node set-auth-token.mjs
RUN npm run build

FROM base_with_env_vars AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S -g 1001 nodejs
RUN adduser -S -u 1001 -G nodejs nextjs

COPY --from=next_builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=next_builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=next_builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# RUN mkdir Drone-Strapi
# COPY --from=strapi_builder --chown=nextjs:nodejs /app ./Drone-Strapi

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]