export default function parse(element, {document}) {
  // Extract the necessary elements
  const imageElement = element.querySelector('.cmvlt-component-card__image');
  const titleElement = element.querySelector('.cmvlt-component-card__title');
  const descriptionElement = element.querySelector('.cmvlt-component-card__description');
  const ctaElement = element.querySelector('a.cmvlt-2-custom-button');

  // Create content for the table
  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElement.textContent.trim();
  }

  const description = descriptionElement ? document.createElement('p') : null;
  if (description) {
    description.textContent = descriptionElement.textContent.trim();
  }

  const cta = ctaElement ? document.createElement('a') : null;
  if (cta) {
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent.trim();
  }

  // Create header row with exact specification
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create table cells
  const cells = [
    [headerRow],
    [[image], title, description, cta].filter(Boolean)
  ];

  // Replace the original element with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}