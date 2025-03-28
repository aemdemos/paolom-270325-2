export default function parse(element, {document}) {
  const cells = [];

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract content from provided element
  const items = element.querySelectorAll('.item-feature');

  items.forEach((item) => {
    const imageElement = item.querySelector('.stats__image');
    const titleElement = item.querySelector('.featureTitle');
    const descriptionElement = item.querySelector('p');

    // Create image cell
    const image = document.createElement('img');
    image.src = imageElement ? imageElement.src : '';
    image.alt = imageElement ? imageElement.alt : '';

    // Create text cell
    const textContent = [];

    if (titleElement) {
      const title = document.createElement('h3');
      title.textContent = titleElement.textContent.trim();
      textContent.push(title);
    }

    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent.trim();
      textContent.push(description);
    }

    // Add row to cells array
    cells.push([image, textContent]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}