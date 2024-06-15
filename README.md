![image](https://github.com/matrworld/the-76-devs/assets/59782726/10bdc049-ca2f-49f5-94fc-c149681a612a)

# The 76 Devs Monorepo
A monorepo containing websites and tools used in The 76 Devs community.

## Join Discord
https://discord.gg/Tk5xjNjbeU

## Development

### Setup
1. Make sure you have Node 20+ installed.
2. Make sure you have `pnpm` installed. If not run `npm i -g pnpm`.
3. Install monorepo with `pnpm i`.

### Run Apps
Run specific apps using the `pnpm dev` script and a `--filter` flag with the app name you want to run. Running `pnpm dev` without `--filter` will start all apps in the repo at once.

#### Example
To start the dev server for the 76 website app, run `pnpm dev --filter website` where `website` is the name of the app in its `package.json`. 

## Apps
### The 76 Website
📂 `./apps/website`

#### Setup
##### Environment
  1. Create a new `.env` file at `./apps/website/.env`.
  2. Copy the contents from `./apps/website/.env.example` into your new `.env` file.
  3. Fill in any empty variables as needed.

#### Start Dev
Once setup, start the dev server by running either the `pnpm website` alias or running `pnpm dev --filter website` directly.
