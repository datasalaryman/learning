import { createCliRenderer, TextAttributes } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { rpc, getVersion } from '@/services/rpc';
import { env } from '@/env';
import { createKeyPairFromBytes } from '@solana/kit';
import bs58 from 'bs58';

const queryClient = new QueryClient();

function App() {
  // RPC connection test using getVersion
  const { isPending: isRpcPending, error: rpcError, data: rpcData } = useQuery({
    queryKey: ['rpc-connection'],
    queryFn: getVersion,
    retry: 2,
    retryDelay: 1000,
  });

  // Keypair validation
  const { isPending: isKeypairPending, error: keypairError } = useQuery({
    queryKey: ['keypair-validation'],
    queryFn: () => {
      const keypairBytes = bs58.decode(env.SOLANA_KEYPAIR);
      return createKeyPairFromBytes(keypairBytes);
    },
    retry: false, // Don't retry keypair validation
  });

  const isLoading = isRpcPending || isKeypairPending;
  const hasError = rpcError || keypairError;

  if (isLoading) {
    return (
      <box alignItems="center" justifyContent="center" flexGrow={1}>
        <text>Validating environment...</text>
      </box>
    );
  }

  if (hasError) {
    return (
      <box alignItems="center" justifyContent="center" flexGrow={1}>
        <box flexDirection="column" alignItems="center">
          <text>Validation Error:</text>
          <text>{rpcError?.message || keypairError?.message}</text>
          <text attributes={TextAttributes.DIM}>Press Ctrl+C to exit</text>
        </box>
      </box>
    );
  }

  // Original app content
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="tiny" text="Solana Login" />
        <text attributes={TextAttributes.DIM}>Successfully connected to Devnet with Keypair</text>
      </box>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
