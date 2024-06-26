"use client";
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { useWallet } from "@solana/wallet-adapter-react"

export default function Home() {
  const { publicKey, connected } = useWallet()

  return (
    <div>
      <div>
        <div className="pb-20">
          <h1 className="font-bold text-xl">76 Blink</h1>
          <i>Waiting for a 76th dev to make an app here...</i>
        </div>
        <p>Connected Wallet: {connected ? publicKey?.toBase58() : ""}</p>
        <WalletMultiButton />
      </div>
    </div>
  );
}
