// Read environment variables apps .env.example file and write them to .env file.
// Usage: node scripts/write-env.js <app-name>
const path = require("path");
const fs = require("fs");

(async () => {
    const appName = process.argv[2];
    const appPath = path.join(process.cwd(), "apps", appName);
    const dotEnvExample = await fs.promises.readFile(path.join(appPath, ".env.example"), 'utf8');
    const keys = dotEnvExample.split("\n").map(line => line.split("=")[0]);

    async function appendAppDotEnv(key, value){
        return fs.promises.appendFile(path.join(appPath, ".env"), `${key}="${value}"\n`);
    }

    for(let key of keys) {
        const value = process.env[key];

        if(!value) continue;

        await appendAppDotEnv(key, value);
    }
})();