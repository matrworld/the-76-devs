// Format downloaded format to more usable format
import { directories as _directories } from "./data/directories";

import fs from "fs";

// Example
// {
//     devcard: {
//       bio: 'Bee (man)',
//       image: 'https://cdn.helius-rpc.com/cdn-cgi/image//https://arweave.net/kJ0sOnCp_a1eoIIjKCUowKsGT3u9uJLERKmay3BYiTI',
//       nickname: 'beeman',
//       x: 'beeman_nl',
//       discord: 'beeman.dev',
//       github: 'beeman',
//       solarplex: '',
//       role: 'Full Stack Developer',
//       mint: 'E8ptw4kDQ1Ny9vFCFitRFP1MuJhTrCt1FmDHND4xvEZQ',
//       og: true
//     },
//     devlist: { mint: 'DevR5U78hfhxwuNNC2tboexgoQadQMRGytwJKvJEvv4J' }
//   }

import type { Directory } from "./types";

(async () => {
    const directories = _directories as Directory;

    const first100DevCards = directories?.devcard?.slice(
        directories?.devcard.length - 100,
        directories?.devcard.length
    ) || [];

    type User = {
        name?: string;
        avatar?: string;
        bio?: string;
        x?: string;
        discord?: string;
        github?: string;
        role?: string;
        devcard?: string;
        devlist?: string;
        region?: string;
        wallet?: string;
        badges?: string[];
    }

    const users: User[] = Array.from(Object.entries(directories.users))
        .map(([wallet, user]) => {
            const hasDevCard = directories?.devcard?.includes(wallet);
            const hasDevlist = directories?.devlist?.includes(wallet);
            const hasSuperteam = directories?.superteam?.includes(wallet);
            const isOg = first100DevCards?.includes(wallet);

            const badges = [];

            if(hasDevCard) badges.push("devcard");
            if(hasDevlist) badges.push("devlist");
            if(hasSuperteam) badges.push("superteam");
            if(isOg) badges.push("og");

            return {
                name: user?.devcard?.nickname || user?.superteam?.title,
                avatar: user?.devcard?.image,
                bio: user?.devcard?.bio,
                x: user?.devcard?.x,
                discord: user?.devcard?.discord,
                github: user?.devcard?.github,
                role: user?.devcard?.role,
                devcard: user?.devcard?.mint,
                devlist: user?.devlist?.mint,
                region: user?.superteam?.region,
                wallet,
                badges,
            }
        });

    const result = users.reduce<{
        users: User[],
        incomplete: User[],
    }>((acc, user) => {
        if(!user?.name && !user?.devcard) {
            acc.incomplete.push(user);
        } else {
            acc.users.push(user);
        }

        return acc;
    }, {
        users: [],
        incomplete: []
    });

    fs.writeFileSync("./users.json", JSON.stringify(result, null, 2));
})();