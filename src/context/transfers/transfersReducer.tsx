import { TransfersAction } from './transfersAction';
import { TransfersState } from './transfersState';

export const transfersReducer = (
  state: TransfersState,
  action: TransfersAction,
): TransfersState => {
  switch (action.type) {
    case 'loadTransfers':
      return {
        ...state,
        transfers: action.payload,
        isLoading: false,
      };
    case 'createTransfer':
      return {
        ...state,
        isLoading: true,
      };
    case 'createTransferSuccess':
      return {
        ...state,
        transfers: [...state.transfers, action.payload],
        isLoading: false,
      };
    default:
      return state;
  }
};
