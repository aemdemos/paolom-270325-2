export default function parse(element, {document}) {
  // Extract content safely from the promo-card element
  const titleElement = element.querySelector('.title');
  const descriptionElement = element.querySelector('.description');
  const ctaElement = element.querySelector('.scalable-cta-button a');

  // Ensure safe creation of DOM elements with fallback checks
  const title = document.createElement('h2');
  title.textContent = titleElement ? titleElement.textContent.trim() : '';

  const description = document.createElement('p');
  description.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

  let cta = null;
  if (ctaElement) {
    cta = document.createElement('a');
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.querySelector('span') ? ctaElement.querySelector('span').textContent.trim() : ctaElement.textContent.trim();
  }

  // Construct the table cells array
  const headerRow = ['Hero']; // Ensure the header matches exactly with plain text

  const cells = [
    headerRow, // Header row
    [
      title,
      description,
      ...(cta ? [cta] : []) // Include CTA only if it exists
    ]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}