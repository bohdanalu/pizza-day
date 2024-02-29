export const calcTotalItem = (items) =>
  items.reduce((sum, item) => sum + item.qty, 0);
export const calcTotalPrice = (items) =>
  items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
