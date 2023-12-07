FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# RUN npx prisma generate

RUN npx prisma migrate deploy --skip-generate

CMD ["npm", "run", "start"]
