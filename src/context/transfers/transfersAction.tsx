export type TransfersAction =
  | { type: 'loadTransfers'; payload: { token: string } }
  | { type: 'createTransfer'; payload: string }
  | { type: 'createTransferSuccess'; payload: any };
