
export type DownloadDevCardResponse = {
  wallet: string;
  devcard: DevCard;
};

export type DownloadDevListResponse = {
  wallet: string;
  devlist: DevList;
};

export type DownloadSuperteamResponse = {
  wallet: string;
  superteam: SuperTeam;
};

export const GRADIENTS = {
  hyper: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500',
  oceanic: 'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
  candy: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
  gotham: 'bg-gradient-to-r from-gray-700 via-gray-900 to-black',
  solana: 'bg-gradient-to-r from-green-200 via-green-400 to-purple-700',
  sun: 'bg-gradient-to-r from-yellow-600 to-red-600',
  pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
  ice: 'bg-gradient-to-r from-rose-100 to-teal-100',
  sky: 'bg-gradient-to-b from-sky-400 to-sky-200',
  emerald: 'bg-gradient-to-r from-emerald-500 to-lime-600',
  purple:
    'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-indigo-500',
  spotlight:
    'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900',
  flame:
    'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900',
  'warm glow':
    'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600',
  metal:
    'bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200',
  rocket:
    'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800',
  space: 'bg-gradient-to-r from-gray-900 to-gray-700',
};

export const CARD_BACKGROUNDS = {
  light: GRADIENTS.ice,
  dark: GRADIENTS.space,
};


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