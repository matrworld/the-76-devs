<!-- Docs: https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/ui/README.md#sveltekit -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import {
		workSpace,
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';

    // import {
    //     PhantomWalletAdapter,
    //     SolflareWalletAdapter
    // } from '@solana/wallet-adapter-wallets';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet

	let wallets: any;

	onMount(async () => {
		const {
			PhantomWalletAdapter,
			SolflareWalletAdapter
		} = await import("@solana/wallet-adapter-wallets");

		const walletsMap = [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter()
		];

		wallets = walletsMap;
	});
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<ConnectionProvider {network} />
<div>
	<slot />
</div>

Just a simple Sveltekit app with Solana wallet connect.
<WalletMultiButton />