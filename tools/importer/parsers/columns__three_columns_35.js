export default function parse(element, {document}) {
  // Extract the header for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract data for the table cells dynamically
  const leftColumnText = element.querySelector('div.wp-block-column:nth-child(1) p');
  const rightColumnImageContainer = element.querySelector('div.wp-block-column:nth-child(2) div.wp-block-image figure');

  // Handle edge cases for missing elements
  const leftContent = leftColumnText ? leftColumnText.cloneNode(true) : document.createElement('p');
  const rightImage = rightColumnImageContainer ? rightColumnImageContainer.cloneNode(true) : document.createElement('div');

  // Structure for the table rows
  const cells = [
    headerRow,
    [leftContent, rightImage],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}