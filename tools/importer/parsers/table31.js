export default function parse(element, {document}) {
  // Create the header row, matching the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table';
  const headerRow = [headerCell];

  const cells = [headerRow];

  // Extract all rows from the input element
  const rows = element.querySelectorAll('tr');

  rows.forEach((row) => {
    const columns = row.querySelectorAll('td');
    const rowData = [];

    columns.forEach((column) => {
      if (column.children.length > 0) {
        // Add child elements (e.g., SVGs) to the cell
        rowData.push(Array.from(column.children));
      } else {
        // Add text content to the cell
        const textContent = column.textContent.trim();
        if (textContent) {
          rowData.push(textContent);
        }
      }
    });

    if (rowData.length > 0) {
      cells.push(rowData);
    }
  });

  // Ensure volume discount information is included properly as its own row
  const lastRow = rows[rows.length - 1];
  if (lastRow) {
    const discountColumn = lastRow.querySelector('td.text-body-xs');
    if (discountColumn) {
      const discountText = discountColumn.textContent.trim();
      if (discountText) {
        const discountRow = [discountText];
        cells.push(discountRow);
      }
    }
  }

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}