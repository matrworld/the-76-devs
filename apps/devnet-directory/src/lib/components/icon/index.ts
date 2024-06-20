// Use Lucide icons whenever possible.
// How to add non-lucide icons:
// 1. Create a new component for the svg in ./other
// 2. Leave viewbox but remove most attributes like width/height/colors in most cases so we have control.
// 3. Add {...$$props} to the svg element so we can pass classes, styles, etc.
// 3. Add the component to the icons object below.
import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    Check,
    Copy,
    Compass,
    LogIn,
    LogOut,
    MessageCircleMore,
    User,
    Wallet,
    X,
    PencilRuler,
    Trophy
} from "lucide-svelte";

import Google from "$lib/components/icon/other/google.svelte";
import Github from "$lib/components/icon/other/github.svelte";
import Twitter from "$lib/components/icon/other/twitter.svelte";
import Discord from "$lib/components/icon/other/discord.svelte";

export { default as Icon } from "$lib/components/icon/icon.svelte";

export type IconSize = "sm" | "md" | "lg";

export const icons = {
    // Lucide
    LogIn,
    LogOut,
    User,
    Compass,
    MessageCircleMore,
    Wallet,
    X,
    Copy,
    Check,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDown,
    PencilRuler,
    Trophy,

    // Other
    Google,
    Github,
    Twitter,
    Discord
};

export type IconName = keyof typeof icons;
