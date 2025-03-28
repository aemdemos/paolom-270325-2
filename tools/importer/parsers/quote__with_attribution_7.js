export default function parse(element, {document}) {
  const cells = [];

  // Add header row with block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract quote
  const quoteElement = element.querySelector('.cmvlt-component-card__title');
  const quote = quoteElement ? quoteElement.textContent.trim() : '';
  cells.push([quote]);

  // Extract attribution and source
  const authorNameElement = element.querySelector('.author_name');
  const authorRoleElement = element.querySelector('.author_role');

  const attribution = authorNameElement ? authorNameElement.textContent.trim() : '';
  const source = authorRoleElement ? authorRoleElement.textContent.trim() : '';

  cells.push([`${attribution}, ${source}`]);

  // Create table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table
  element.replaceWith(blockTable);
}