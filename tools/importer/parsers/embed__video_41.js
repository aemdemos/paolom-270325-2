export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Ensure the link is dynamically extracted
  const linkElement = element.querySelector('a');
  const url = linkElement ? linkElement.href : '';

  // Handle edge case: If there is no URL, do not proceed
  if (!url) {
    console.warn('No URL found in the provided element. Skipping table creation.');
    return;
  }

  // Construct the cells array dynamically
  const cells = [
    headerRow, // Header row
    [url]      // Content row with the URL
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  if (element.parentNode) {
    element.parentNode.replaceChild(blockTable, element);
  }
}