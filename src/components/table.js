import { cloneTemplate } from "../lib/utils.js";

export function initTable(settings, onAction) {
  const { tableTemplate, rowTemplate, before, after } = settings;
  const root = cloneTemplate(tableTemplate);

  // @todo: #1.2 — вывести дополнительные шаблоны до и после таблицы
  console.log('before:', before, 'after:', after);

  before.reverse().forEach(subName => {
    console.log('Adding before:', subName);
    root[subName] = cloneTemplate(subName);
    root.container.prepend(root[subName].container);
  });

  after.forEach(subName => {
    root[subName] = cloneTemplate(subName);
    root.container.append(root[subName].container);
  });  

  // @todo: #1.3 — обработать события и вызвать onAction()
root.container.addEventListener('change', () => onAction());
root.container.addEventListener('reset', () => setTimeout(onAction));
root.container.addEventListener('submit', (e) => {
    e.preventDefault();
    onAction(e.submitter);
});

  const render = (data) => {
    const nextRows = data.map((item) => {
      const row = cloneTemplate(rowTemplate);

      Object.keys(item).forEach((key) => {
        if (row.elements[key]) {
          row.elements[key].textContent = item[key];
        }
      });

      return row.container;
    });
    root.elements.rows.replaceChildren(...nextRows);
  };

  return { ...root, render };
}