export const convertSimpleDate = (date) => {
  return new Date(date).toLocaleDateString('ko').slice(0, -1);
};
