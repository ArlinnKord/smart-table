import { createComparison, defaultRules } from "../lib/compare.js";

export const initFiltering = (elements, indexes) => {
    // @todo: #4.1 — заполнить выпадающие списки данными
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });

    // @todo: #4.3 — настроить функцию сравнения
    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        // @todo: #4.2 — очистка полей фильтров
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const parent = action.closest('.filter-group');
            const input = parent.querySelector('input, select');
            if (input) input.value = '';
            state[field] = '';
        }

        // @todo: #4.5 — применить фильтрацию к данным
        return data.filter(row => compare(row, state));
    };
};