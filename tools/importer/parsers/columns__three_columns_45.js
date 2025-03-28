export default function parse(element, {document}) {
  // Extract header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract each column data dynamically
  const columns = Array.from(element.querySelectorAll('.wp-block-commvault-v2-news-card'));

  // Initialize cells array with header row for table creation
  const cells = [headerRow];

  // Map column data into table rows
  const columnData = columns.map(column => {
    const title = column.querySelector('.cmvlt-component-card__title');
    const description = column.querySelector('.cmvlt-component-card__description');
    const cta = column.querySelector('.cmvlt-component-card__cta a');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title ? title.textContent.trim() : '';

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description ? description.textContent.trim() : '';

    const ctaElement = document.createElement('a');
    if (cta) {
      ctaElement.href = cta.href;
      ctaElement.target = cta.target;
      ctaElement.textContent = cta.textContent.trim();
    }

    return [titleElement, descriptionElement, ctaElement];
  });

  // Add dynamically extracted column data to the cells array
  cells.push(columnData);

  // Create table block using extracted cells
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the created table block
  element.replaceWith(block);
}