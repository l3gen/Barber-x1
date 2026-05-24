FROM --platform=linux/amd64 node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM --platform=linux/amd64 node:20-alpine AS prod
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5000
CMD ["node", "src/index.js"]
