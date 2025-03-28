export default function parse(element, {document}) {
  // Extract columns from the 'wp-block-columns' element
  const columns = Array.from(element.querySelectorAll('.wp-block-column'));

  // Prepare rows for the block table
  const rows = [];

  // Add the header row for the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract the content inside each column and create table cells
  const contentRow = columns.map((column) => {
    // Get all the <p> elements within the column
    const paragraphs = Array.from(column.querySelectorAll('p'));

    // Create a div to wrap the column content
    const columnDiv = document.createElement('div');
    paragraphs.forEach((p) => {
      columnDiv.appendChild(p.cloneNode(true));
    });

    return columnDiv;
  });

  rows.push(contentRow);

  // Create the block table using the WebImporter.DOMUtils helper function
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);

}