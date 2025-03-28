export default function parse(element, {document}) {
  // Extract content from provided element
  const eyebrow = element.querySelector('.eyebrow');
  const title = element.querySelector('.section_title');
  const description = element.querySelector('.description');

  // Create header row with exact match
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create a single cell for the content row
  const contentCell = document.createElement('div');

  if (eyebrow) {
    contentCell.appendChild(eyebrow.cloneNode(true));
  }

  if (title) {
    contentCell.appendChild(title.cloneNode(true));
  }

  if (description) {
    contentCell.appendChild(description.cloneNode(true));
  }

  const contentRow = [contentCell];

  const cells = [
    headerRow,
    contentRow
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block
  element.replaceWith(block);
}