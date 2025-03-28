export default function parse(element, {document}) {
  const cards = element.querySelectorAll('.cmvlt-component-card');

  // Ensure the table header matches the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const rows = [headerRow];

  const contentRow = [];

  // Iterate through each card to dynamically extract content
  cards.forEach((card) => {
    const imageElement = card.querySelector('img');
    const nameElement = card.querySelector('h3');
    const jobElement = card.querySelector('p');

    const columnContent = document.createElement('div');

    // Dynamically add image to column content
    if (imageElement && imageElement.src) {
      const img = document.createElement('img');
      img.src = imageElement.src;
      img.alt = imageElement.alt || '';
      columnContent.appendChild(img);
    }

    // Dynamically add name to column content
    if (nameElement && nameElement.textContent.trim()) {
      const name = document.createElement('h4');
      name.textContent = nameElement.textContent.trim();
      columnContent.appendChild(name);
    }

    // Dynamically add job title to column content
    if (jobElement && jobElement.textContent.trim()) {
      const job = document.createElement('p');
      job.textContent = jobElement.textContent.trim();
      columnContent.appendChild(job);
    }

    contentRow.push(columnContent);
  });

  // Add populated content row to table rows
  rows.push(contentRow);

  // Create and replace block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}