## Codec Runbook
https://github.com/soloranor/codec
1. Clone repo
2. Add a `.env` file root level of the repo and add the following vars. We can all share this database for now or if you want your own database like you set one up locally or have one elsewhere you can add your own postgres string. I'd recommend setting up a local postgres db for yourself sometime in the near future then you can add mock data and delete it whenever you need and stuff. 
```
AUTH_ENVIRONMENT="development"
AUTH_DATABASE_URL="postgresql://postgres:OODKywmLLnxbhkSVlhCXONdtBrVYlIaT@monorail.proxy.rlwy.net:56602/railway"
AUTH_GOOGLE_OAUTH_CLIENT_ID="987739416482-4qgfuicgve6djkpsbpko2o3ulqqvj7tc.apps.googleusercontent.com"
AUTH_GOOGLE_OAUTH_CLIENT_SECRET="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"
AUTH_GOOGLE_OAUTH_REDIRECT_URI="http://localhost:5176/api/auth/google/callback"
```
3. We use `pnpm` not `npm`. You can go read up on the benefits but you use it exactly the same, just add a `p` and everything is better and faster.
Install it globally from npm if you need `npm i -g pnpm`
4. Install codec `pnpm i`
5. Run codec `pnpm run dev`

## Tasks/Project Management
Tasks, resources, and docs will all be stored under the repo in the Projects tab.
https://github.com/users/soloranor/projects/1

## Designs
Super duper work in progress and we probably wont ever have perfect high fidelity designs. But here's a working Figma where we can brainstorm and I'll mock stuff up to get us started. 
https://www.figma.com/file/IYQICEqP6qvYkqkeyFOum4/codec?type=design&node-id=0%3A1&mode=design&t=4ow9UsA1TmvzgKKu-1

## Docker config
1) In your `.env` define : 
```
DATABASE_URL=postgresql://root:mysecretpassword@host.docker.internal:5488/codec
```
2) run `pnpm docker:up`

3) once the containers are up and running do `pnpm db:push` to push the `schema.prisma`

4) start Codec using `pnpm dev` 

5) [OPTIONAL] populate the database with fake data using `pnpm db:fake`