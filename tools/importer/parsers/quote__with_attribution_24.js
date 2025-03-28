export default function parse(element, {document}) {

  // Extract the block name header row
  const blockNameHeader = document.createElement('strong');
  blockNameHeader.textContent = 'Quote';
  const blockNameRow = [blockNameHeader];

  // Extract the quote text dynamically
  const quoteElement = element.querySelector('.cmvlt-component-card__title');
  const quoteText = quoteElement ? quoteElement.textContent.trim() : '';

  // Extract the attribution text dynamically
  const attributionElement = element.querySelector('.author_name');
  const attributionText = attributionElement ? attributionElement.textContent.trim() : '';

  // Handle edge cases where data might be missing
  const cells = [
    blockNameRow,
    [quoteText || ''],
    [attributionText || ''],
  ];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}