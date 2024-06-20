export type DevCard = {
    image?: string;
    role?: string;
    nickname?: string;
    wallet?: string;
    x: string;
    discord: string;
    github: string;
    solarplex?: string;
    bio: string;
    og?: boolean;
    projects?: string;
    mint?: string;
    theme?: {
        background: string;
        card: string;
    };
};

export type DevList = {
    mint: string;
};
  
export type SuperTeam = {
    title: string;
    region: string;
};
  
export type User = {
    devcard?: DevCard;
    devlist?: DevList;
    superteam?: SuperTeam;
    wallet?: string;
};

export type Directory = {
    devcard?: string[],
    devlist?:  string[],
    superteam?:  string[],
    users: Record<string, User>
}