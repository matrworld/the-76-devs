const {
    DEVLIST_API_URL = "",
    NEXT_PUBLIC_RPC_URL = "",
    NEXT_PUBLIC_COLLECTION = ""
} = {
    DEVLIST_API_URL: "https://solfate.com/api/lists/developers",
    NEXT_PUBLIC_RPC_URL: "https://mainnet.helius-rpc.com/?api-key=9af16a80-b022-4d6c-a737-56fa166ebe00",
    NEXT_PUBLIC_COLLECTION: "Da7ryJm1WRaZagzWVSYvS8dtwQnV1iN3cz76wGH7D6UX"
};

import fs from "fs";

import type {
    DownloadDevCardResponse,
    DownloadDevListResponse,
    DownloadSuperteamResponse,
    User
} from "./types";

import { transformAttributes, isSolanaPublicKey } from "./utils";

async function downloadDevCards(): Promise<DownloadDevCardResponse[]> {
    const response = await fetch(NEXT_PUBLIC_RPC_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getAssetsByGroup',
            params: {
                groupKey: 'collection',
                groupValue: NEXT_PUBLIC_COLLECTION,
                page: 1,
                limit: 1000,
                sortBy: { sortBy: 'created', sortDirection: 'desc' }
            },
        }),
    });

    const data = await response.json();

    const items = data?.result?.items || [];

    const filtered = items.filter((item: any) =>
        item?.content &&
        item?.content?.metadata
    );

    const result = [];

    for(let i = 0; i < filtered.length; i++) {
        const content = filtered[i]?.content;
        const mint = filtered[i]?.id;
        const owner = filtered[i]?.ownership?.owner;
        const image = content?.files[1]?.cdn_uri || content?.files[0]?.cdn_uri;
        const og = i > (filtered.length - 100);
        const bio = content?.metadata?.description || "";

        const {
            Nickname : nickname = "",
            Role : role = "",
            Github: github = "",
            Discord: discord = "",
            X: x = "",
            Solarplex: solarplex = ""
        } = transformAttributes(content.metadata.attributes || []);

        const devcard = {
            wallet: owner,
            devcard: {
                bio,
                image,
                nickname,
                x,
                discord,
                github,
                solarplex,
                role,
                mint,
                og,
            }
        }
        
        if(!isSolanaPublicKey(owner)) continue;
        
        result.push(devcard);
    }
    
    return result;
}
 
async function downloadDevList(): Promise<DownloadDevListResponse[]> {
    const response = await fetch(DEVLIST_API_URL);
    const data = await response.json();

    const result = [];

    for(let i = 0; i < data?.members?.length; i++) {
        const { token, owner } = data?.members[i];

        if(!isSolanaPublicKey(owner)) continue;

        result.push({
            wallet: owner,
            devlist: {
                mint: token
            }
        });
    }

    return result;
}

async function downloadSuperteam(): Promise<DownloadSuperteamResponse[]> {
    // NOTE: Superteam is occasionally downloaded from here and added to ./data
    // https://airtable.com/embed/appJfWLaWdNyZ0e8E/shrf1MCOe4LyLJpKM/tbl8bvPxvOtEhG2m1?backgroundColor=grayLight&viewControls=on
    const data = await fs.readFileSync("./src/scripts/data/superteam.csv");

    const lines = data.toString().split("\n");

    const [ _, ...rows ] = lines;

    const result = [];

    for(let i = 0; i < rows.length; i++) {
        const [ title, wallet, region ] = rows[i].split(",");

        if(!isSolanaPublicKey(wallet)) continue;

        result.push({
            wallet,
            superteam: {
                title,
                region
            }
        });
    }

    return result;
}

(async () => {
    const [
        devcards,
        devlist,
        superteam
    ] = await Promise.all([
        downloadDevCards(),
        downloadDevList(),
        downloadSuperteam()
    ]);

    const result: {
        devcard: string[],
        devlist:  string[],
        superteam:  string[],
        users: Record<string, User>
    } = {
        devcard: [],
        devlist: [],
        superteam: [],
        users: {}
    };

    for(const user of devcards) {
        result.users = {
            ...result.users,
            [user.wallet]: {
                ...result.users[user.wallet],
                devcard: user?.devcard
            }
        }

        result.devcard.push(user.wallet);
    }

    for(const user of devlist) {
        result.users = {
            ...result.users,
            [user.wallet]: {
                ...result.users[user.wallet],
                devlist: user.devlist
            }
        }

        result.devlist.push(user.wallet);
    }

    for(const user of superteam) {
        result.users = {
            ...result.users,
            [user.wallet]: {
                ...result.users[user.wallet],
                superteam: user.superteam
            }
        }

        result.superteam.push(user.wallet);
    }

    const serialized = JSON.stringify(result);

    fs.writeFileSync("./directories.json", serialized);
})()