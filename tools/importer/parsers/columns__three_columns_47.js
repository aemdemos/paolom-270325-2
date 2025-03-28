export default function parse(element, {document}) {
  // Helper function to create the block table
  const cells = [];

  // Add the block type header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Gather columns and their content
  const columns = Array.from(element.querySelectorAll('.item-statistic'));
  const columnData = [];

  columns.forEach((column) => {
    const titleElement = column.querySelector('.statisticTitle');
    const descriptionElement = column.querySelector('p');

    const columnHeader = document.createElement('h3');
    columnHeader.innerHTML = titleElement ? titleElement.innerHTML.trim() : '';

    const columnContent = document.createElement('p');
    columnContent.innerHTML = descriptionElement ? descriptionElement.innerHTML.trim() : '';

    columnData.push([columnHeader, columnContent]);
  });

  // Ensure consistent column structure
  const row = columnData.map((data) => {
    return data;
  });

  // Add the content rows
  cells.push(row);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the target element
  element.replaceWith(block);
}