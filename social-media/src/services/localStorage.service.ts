/* eslint-disable class-methods-use-this */
class LocalStorageService {
  obter = (chave: string): any | null => {
    const objeto = localStorage.getItem(chave);
    if (objeto) {
      return JSON.parse(objeto);
    }
    return null;
  };

  salvar = (chave: string, objeto: any): void => {
    localStorage.setItem(chave, JSON.stringify(objeto));
  };

  remover = (chave: string): void => {
    localStorage.removeItem(chave);
  };

  existe = (chave: string): boolean => {
    return !!localStorage.getItem(chave);
  };
}

export default new LocalStorageService();
