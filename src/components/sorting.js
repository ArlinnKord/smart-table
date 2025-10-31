import { sortMap } from "../lib/sort.js";

export const initSorting = (columns) => {
  let field = null;
  let order = null;

  return (query, state, action) => {
    // @todo: #3.1 — обработать действие сортировки
    if (action && action.dataset.field) {
      action.dataset.value = sortMap[action.dataset.value];
      field = action.dataset.field;
      order = action.dataset.value;

      // @todo: #3.2 — сбросить состояние остальных кнопок
      columns.forEach((column) => {
        if (column.dataset.field !== action.dataset.field) {
          column.dataset.value = "none";
        }
      });
    }

    // @todo: #3.3 — применить выбранный режим сортировки
    columns.forEach((column) => {
      if (column.dataset.value !== "none") {
        field = column.dataset.field;
        order = column.dataset.value;
      }
    });

    const sort = (field && order !== 'none') ? `${field}:${order}` : null;

    return sort ? Object.assign({}, query, { sort }) : query;
  };
};