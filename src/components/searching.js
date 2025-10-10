export const initSearching = (searchField) => {
  return (data, state, action) => {
    const searchTerm = state[searchField]?.toLowerCase();

    if (!searchTerm) return data;

    return data.filter((row) => {
      const searchFields = ["date", "seller", "customer", "id"];

      return searchFields.some((field) => {
        const value = row[field];
        return value && value.toString().toLowerCase().includes(searchTerm);
      });
    });
  };
};
