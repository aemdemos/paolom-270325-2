export default function parse(element, {document}) {
  // Create a header row with the block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract content from the input element
  const eyebrow = element.querySelector('.call-to-action__eyebrow');
  const title = element.querySelector('.call-to-action__title');
  const ctaButton = element.querySelector('.cmvlt-2-custom-button a');

  // Create content elements
  const eyebrowElement = document.createElement('p');
  eyebrowElement.textContent = eyebrow ? eyebrow.textContent : '';

  const titleElement = document.createElement('h1');
  titleElement.textContent = title ? title.textContent : '';

  const ctaElement = document.createElement('a');
  if (ctaButton) {
    ctaElement.href = ctaButton.href;
    ctaElement.textContent = ctaButton.textContent;
  } else {
    ctaElement.textContent = ''; // Placeholder for missing button
  }

  // Arrange content into rows for the table
  const cells = [
    headerRow, // Header row spans the entire width
    [eyebrowElement, titleElement, ctaElement], // Content row
  ];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}