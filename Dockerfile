FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma generate

RUN npm run build

# RUN npx prisma generate

CMD ["npm", "run", "start"]
