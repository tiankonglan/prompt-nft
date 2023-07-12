import { useState, useEffect } from 'react';
import { useChain } from '@cosmos-kit/react';

// import cosmwasm client generated with cosmwasm-ts-codegen
import { Cw721BaseQueryClient } from '../codegen/Cw721Base.client';
import { chainName } from '../config';

export function useHackCw721Base(contractAddress: string): {
  balance: string | undefined;
} {
  const { getSigningCosmWasmClient, address, status } = useChain(chainName);

  const [cw721BaseClient, setCw721BaseQueryClient] = useState<Cw721BaseQueryClient | null>(
    null
  );
  useEffect(() => {
    if (status === 'Connected') {
      getSigningCosmWasmClient().then((cosmwasmClient) => {
        if (!cosmwasmClient || !address) {
          console.error('cosmwasmClient undefined or address undefined.');
          return;
        }

        setCw721BaseQueryClient(new Cw721BaseQueryClient(cosmwasmClient, contractAddress));
      });
    }
  }, [address, contractAddress, getSigningCosmWasmClient, status]);
  const [cwContractInfo, setCwContractInfo] = useState<string | null>(null);
  useEffect(() => {
    if (cw721BaseClient && address) {
      cw721BaseClient.contractInfo().then((b) => setCwContractInfo(b.name));
    }
  }, [cw721BaseClient, address]);

  return { balance: cwContractInfo ?? undefined };
}
