FROM --platform=linux/amd64 node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM --platform=linux/amd64 node:20-alpine AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

FROM --platform=linux/amd64 node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM --platform=linux/amd64 nginx:alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
