# Eth Global backend

## Tools
 - Firebase Cloud Functions
 - Firebase Firestore for Database

## Project Setup

### 1. Install Dependencies

Install [Nestjs CLI](https://docs.nestjs.com/cli/usages) to start and [generate CRUD resources](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute)

```bash
# npm
npm i -g @nestjs/cli
# yarn
yarn add -g @nestjs/cli
```

Install the dependencies for the Nest application:

```bash
# npm
npm install
# yarn
yarn install
```

### 2. Create .env

You need to create Firebase Admin SDK credential and Firebase Client credential for running application

1. Download Firebase Admin SDK and save as firebase-adminsdk.json
2. Download Firebase Client and save as firebase-config.json

Running script to generate enironment config

```bash
node x-genenv.js
# copy output and save it to .env
```

### 3. Start NestJS Server

Run Nest Server in Development mode:

```bash
yarn start

# watch mode
yarn start:dev
```

### 4 . Running as Firebase emulator

Run Firebase emulator in Development mode:

```bash
yarn serve:dev
```

Starter source [nestjs-boilerplate](https://github.com/notiz-dev/nestjs-prisma-starter)
