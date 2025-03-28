export default function parse(element, {document}) {
  const cards = [...element.querySelectorAll('.wp-block-commvault-v2-double-side-image-card')];

  // Create header row that matches example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];

  const cells = [headerRow];

  cards.forEach(card => {
    const img = card.querySelector('.double-side-image--left img');
    const title = card.querySelector('.section__title');
    const description = card.querySelector('.section__description');

    // Ensure elements exist before accessing properties
    const imageElement = img ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = img.src;
      imageElement.alt = img.alt;
    }

    const titleElement = title ? document.createElement('h2') : null;
    if (titleElement) {
      titleElement.textContent = title.textContent.trim();
    }

    const descriptionElement = description ? document.createElement('p') : null;
    if (descriptionElement) {
      descriptionElement.textContent = description.textContent.trim();
    }

    // Push rows dynamically based on available content
    cells.push([
      imageElement,
      [titleElement, descriptionElement].filter(Boolean) // Filter out nulls in case elements are missing
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}