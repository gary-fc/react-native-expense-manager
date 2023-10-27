export interface TransfersState {
  transfers: any;
  isLoading: boolean;
  composeTransfer: boolean;
}

export const transfersInitialState: TransfersState = {
  transfers: [],
  isLoading: false,
  composeTransfer: false,
};
