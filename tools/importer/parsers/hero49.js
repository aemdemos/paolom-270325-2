export default function parse(element, {document}) {
  const blockName = 'Hero';

  // Extract image
  const imgElement = element.querySelector('img');
  const image = imgElement ? document.createElement('img') : null;
  if (image) {
    image.src = imgElement.getAttribute('src');
    image.alt = imgElement.getAttribute('alt');
  }

  // Extract title
  const titleElement = element.querySelector('.section__title');
  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElement.textContent.trim();
  }

  // Extract description
  const descriptionElement = element.querySelector('.section__description');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description) {
    description.textContent = descriptionElement.textContent.trim();
  }

  // Extract call-to-action
  const ctaElement = element.querySelector('.cmvlt-2-custom-button');
  const ctaLink = ctaElement ? document.createElement('a') : null;
  if (ctaLink && ctaElement.querySelector('span')) {
    ctaLink.href = ctaElement.getAttribute('href');
    ctaLink.textContent = ctaElement.querySelector('span').textContent.trim();

    const ctaIcon = ctaElement.querySelector('svg') ? ctaElement.querySelector('svg').cloneNode(true) : null;
    if (ctaIcon) {
      ctaLink.prepend(ctaIcon);
    }
  }

  // Create table cells dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = blockName;
  const cells = [
    [headerCell],
    [image, title, description, ctaLink].filter(Boolean) // Filter out null values
  ];

  // Create block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}