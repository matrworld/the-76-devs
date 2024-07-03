import { PublicKey } from '@solana/web3.js';

// Transform attributes array into an object
export const transformAttributes = (
  attributesArray: any[]
): Record<string, string> => {
  return attributesArray.reduce(
    (
      acc: { [x: string]: any },
      attr: { trait_type: string | number; value: any }
    ) => {
      acc[attr.trait_type] = attr.value;
      return acc;
    },
    {}
  );
};

export function convertToThumbnail(url: string) {
  const baseUrl = 'https://cdn.helius-rpc.com/cdn-cgi/image/';

  return url.replace(baseUrl, baseUrl + 'width=300,quality=75');
}

export function isSolanaPublicKey(str: string) {
  try {
    return new PublicKey(str);
  } catch (e) {
    return false;
  }
}