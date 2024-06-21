"use client";
import { Button } from "@/components/ui/button";

import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { useWallet } from "@solana/wallet-adapter-react"

export default function Home() {
  const { publicKey, connected } = useWallet()

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl">Demo</h1>
        <p>Example "Connect Wallet" integration for Solana using Next.js</p>
        <p>Connected Wallet: {connected ? publicKey?.toBase58() : ""}</p>
        <WalletMultiButton />
      </div>
      <div className="my-3">
        <Button>Example Shadcn Button</Button>
      </div>
    </div>
  );
}
