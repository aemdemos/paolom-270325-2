export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extracting cards
  const cards = element.querySelectorAll('.cmvlt-component-card');

  const cells = [];

  // Adding header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Parsing each card element
  cards.forEach(card => {
    const imageElement = card.querySelector('img');
    const titleElement = card.querySelector('.cmvlt-component-card__title');
    const descriptionElement = card.querySelector('.cmvlt-component-card__description');
    const ctaElement = card.querySelector('.cmvlt-2-custom-button a');

    const image = document.createElement('img');
    image.src = imageElement ? imageElement.src : '';
    image.alt = imageElement ? imageElement.alt || '' : '';

    const content = [];

    if (titleElement) {
      const title = document.createElement('h2');
      title.textContent = titleElement.textContent;
      content.push(title);
    }

    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent;
      content.push(description);
    }

    if (ctaElement) {
      const link = document.createElement('a');
      link.href = ctaElement.href;
      link.textContent = ctaElement.textContent.trim();
      content.push(link);
    }

    cells.push([image, content]);
  });

  // Creating table block
  const block = createTable(cells, document);

  // Replace the element
  element.replaceWith(block);
}