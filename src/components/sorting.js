import { sortMap } from "../lib/sort.js";

export const initSorting = (columns) => {
  let field = null;
  let order = null;

  return (query, state, action) => {
    if (action && action.dataset.field) {
      action.dataset.value = sortMap[action.dataset.value];
      field = action.dataset.field;
      order = action.dataset.value;

      columns.forEach((column) => {
        if (column.dataset.field !== action.dataset.field) {
          column.dataset.value = "none";
        }
      });
    }

    columns.forEach((column) => {
      if (column.dataset.value !== "none") {
        field = column.dataset.field;
        order = column.dataset.value;
      }
    });

    const allowedFields = ["date", "total"];
    const sort =
      field && order !== "none" && allowedFields.includes(field)
        ? `${field}:${order}`
        : null;

    return sort ? Object.assign({}, query, { sort }) : query;
  };
};
