# The 76 Monorepo
A monorepo for the 76 devs.

## Getting Started
### Requirements
- Node.js
- pnpm
- Docker

### Start Dev Server
Since this is a monorepo you'll need to start dev servers using the following pattern so dependencies are able to resolve. Start a dev server for any of the apps in the `./apps` directory by running the following, where `<appname>` is the name of the app specified in its `package.json` file.
```
pnpm dev --filter <appname>
```
#### Aliases
There are a few aliases to make it easier to start common dev servers in the root `package.json`.
- `pnpm directory`
- `pnpm website`

## Docker

### App Requirements
1. Must be built to run on Node. For example, if you're making a SvelteKit app, make sure it's using `sveltekit-adapter-node`, `nextjs` apps should work out of the box.
2. App must build to a `build` directory located at `./apps/<appname>/build`.
3. App must include a `.env.example` with required environment keys.
4. Apps directory name must be same as its `package.json`/repo name.
5. App must have a `start` script in their own `package.json`.

### Build
Use the root Dockerfile below to build a specific app by providing the `APP_NAME` build arg and replacing `app-name` with your apps package/directory name. Add the following to the monorepos root `package.json` as a script named something like `docker:build:appname`. 
```
docker build -t devnet-directory ./ --build-arg APP_NAME=app-name
```

### Run
The easiest way to run your app locally would be to add a `docker-compose.yaml` in your apps directory (`./apps/<appname>/docker-compose.yaml`) that runs the latest build of your image and specifies a `.env` file to pass to the runtime.

#### Script
Add a script to start run the app in the monorepos root `package.json` named something like `docker:up:myapp` with the following contents.
```
cd apps/<appname> && docker-compose -p <appname> up -d
```
#### Docker Compose
```yaml
version: '3.8'

networks:
  dev-bridge:
    driver: bridge

services:
  my-app
    image: my-app
    container_name: my-app
    env_file:
      - .env
    networks:
      - dev-bridge
    ports:
      - '3001:3000'
    restart: unless-stopped
```