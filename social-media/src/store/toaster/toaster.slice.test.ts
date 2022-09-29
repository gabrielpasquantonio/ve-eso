import { VariantColor } from 'models/enums/variantColor';
import toasterSlice, {
  ToastState,
  addToast,
  closeToast,
} from './toaster.slice';

describe('toast slice', () => {
  const initialState: ToastState = {
    toastList: [],
  };

  it('estado inicial do toast deve ser vazio', () => {
    expect(toasterSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('deve adicionar o toast', () => {
    const actual = toasterSlice(
      initialState,
      addToast({
        color: VariantColor.Success,
        title: 'Success Title',
        description: 'This is the Success Toast',
      })
    );
    expect(actual.toastList.length).toEqual(1);
  });

  it('deve excluir o toast', () => {
    const actual = toasterSlice(initialState, closeToast(0));
    expect(actual.toastList.length).toEqual(0);
  });
});
