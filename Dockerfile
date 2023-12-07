FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

# RUN npx prisma generate

CMD ["npm", "run", "start"]
