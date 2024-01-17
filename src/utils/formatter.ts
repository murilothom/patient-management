export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const documentFormatter = (document: string) => {
  document = document.replace(/[^\d]/g, "");
  return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
