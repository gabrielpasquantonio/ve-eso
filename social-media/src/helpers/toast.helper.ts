import { VariantColor } from 'models/enums/variantColor';
import { store } from 'store/store';
import { addToast } from 'store/toaster/toaster.slice';

class ToastHelper {
  static Mostrar = (
    titulo: string,
    mensagem: string,
    tipo?: VariantColor
  ): void => {
    store.dispatch(
      addToast({
        title: titulo,
        description: mensagem,
        color: tipo,
      })
    );
  };

  static Erro = (mensagem: string): void => {
    ToastHelper.Mostrar('Erro', mensagem, VariantColor.Danger);
  };

  static Sucesso = (mensagem: string): void => {
    ToastHelper.Mostrar('Sucesso', mensagem, VariantColor.Success);
  };
}

export default ToastHelper;
