/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useMutation } from "@tanstack/react-query";

import { NetworkHeaders } from "../types/types";

type SimulateTxProps = {
  rpcUrl: string;
  transactionXdr: string;
  instructionLeeway?: string;
  headers: NetworkHeaders;
};

export const useSimulateTx = () => {
  const mutation = useMutation({
    mutationFn: async ({
      rpcUrl,
      transactionXdr,
      instructionLeeway,
      headers,
    }: SimulateTxProps) => {
      try {
        const res = await fetch(rpcUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "simulateTransaction",
            params: {
              xdrFormat: "json",
              transaction: transactionXdr,
              ...(instructionLeeway
                ? {
                    resourceConfig: {
                      instructionLeeway: Number(instructionLeeway),
                    },
                  }
                : {}),
            },
          }),
        });

        return await res.json();
      } catch (e) {
        throw {
          result: e,
        };
      }
    },
  });

  return mutation;
};
