export default function parse(element, {document}) {
  // Define the header row with exact match to the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const tableHeader = [headerCell];

  // Extract content dynamically from each column
  const columns = Array.from(element.querySelectorAll('.header')).map(header => {
    const columnContent = [];

    // Extract title
    const title = header.querySelector('.toggle-btn span:first-child')?.textContent.trim() || '';
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      columnContent.push(titleElement);
    }

    // Extract description
    const description = header.querySelector('.column-description')?.textContent.trim() || '';
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      columnContent.push(descriptionElement);
    }

    // Extract list items
    const ul = header.querySelector('.description ul');
    if (ul) {
      const ulElement = document.createElement('ul');
      Array.from(ul.querySelectorAll('li')).forEach(li => {
        const liElement = document.createElement('li');
        liElement.textContent = li.textContent.trim();
        ulElement.appendChild(liElement);
      });
      columnContent.push(ulElement);
    }

    // Extract additional information
    const additionalInfo = header.querySelector('.description p')?.textContent.trim() || '';
    if (additionalInfo) {
      const additionalInfoElement = document.createElement('p');
      additionalInfoElement.textContent = additionalInfo;
      columnContent.push(additionalInfoElement);
    }

    return columnContent;
  });

  // Create structured block table
  const cells = [
    tableHeader, // Header row
    columns // Content row dynamically filled from extracted data
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}