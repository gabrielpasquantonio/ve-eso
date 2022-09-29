import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomToastProps } from 'components/Toast/CustomToast/CustomToast';
import { VariantColor } from 'models/enums/variantColor';

import { RootState } from 'store/store';

export interface ToastState {
  toastList: any[];
}

const initialState: ToastState = {
  toastList: [],
};

const toasterSlice = createSlice({
  name: 'toaster',
  initialState,

  reducers: {
    addToast: (state, action: PayloadAction<CustomToastProps>): void => {
      const toastId = new Date().getTime();
      state.toastList = [...state.toastList, { ...action.payload, toastId }];
    },
    closeToast: (state, { payload }) => {
      state.toastList = [
        ...state.toastList.filter((value) => value.toastId !== payload),
      ];
    },
    toastErro: (state, action) => {
      action.payload.color = VariantColor.Danger;
      toasterSlice.caseReducers.addToast(state, action);
    },
    toastSucesso: (state, action) => {
      action.payload.color = VariantColor.Success;
      toasterSlice.caseReducers.addToast(state, action);
    },
  },
});

export const { addToast, closeToast, toastErro, toastSucesso } =
  toasterSlice.actions;

export const selectToast = (state: RootState): any[] => state.toaster.toastList;

export default toasterSlice.reducer;
