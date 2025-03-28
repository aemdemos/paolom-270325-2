export default function parse(element, {document}) {
  // Extract the hero block name
  const heroBlockName = 'Hero';

  // Extract image
  const image = element.querySelector('.wp-block-commvault-v2-hero__image');
  const imgElement = document.createElement('img');
  imgElement.src = image ? image.src : '';
  imgElement.alt = image ? image.alt || '' : '';

  // Extract title
  const title = element.querySelector('h1.title');
  const titleElement = document.createElement('h1');
  if (title) {
    titleElement.textContent = title.textContent.trim();
  }

  // Extract subheading
  const subheading = element.querySelector('p.subheading');
  const subheadingElement = subheading ? document.createElement('p') : null;
  if (subheadingElement) {
    subheadingElement.textContent = subheading.textContent.trim();
  }

  // Extract call-to-action
  const ctaButton = element.querySelector('.wp-block-commvault-v2-custom-button a');
  const ctaElement = ctaButton ? document.createElement('a') : null;
  if (ctaElement) {
    ctaElement.href = ctaButton.href;
    ctaElement.textContent = ctaButton.textContent.trim();
  }

  // Build the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = heroBlockName;
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [
      imgElement,
      titleElement,
      subheadingElement || '',
      ctaElement || '',
    ],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}