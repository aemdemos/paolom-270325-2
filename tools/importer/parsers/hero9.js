export default function parse(element, {document}) {
  // Ensure dynamic content extraction
  const blockName = document.createElement('strong');
  blockName.textContent = 'Hero';

  // Extracting background image dynamically
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null; // Clone to preserve attributes

  // Extracting heading and subheading dynamically
  const headingElement = element.querySelector('.section__title');
  const heading = headingElement ? headingElement.cloneNode(true) : null;
  
  const subheadingElement = element.querySelector('.section__description');
  const subheading = subheadingElement ? subheadingElement.cloneNode(true) : null;

  // Combining content into a single cell in the second row
  const combinedContent = document.createElement('div');
  if (image) combinedContent.appendChild(image);
  if (heading) combinedContent.appendChild(heading);
  if (subheading) combinedContent.appendChild(subheading);

  // Organizing content into cells with proper HTML elements
  const cells = [
    [blockName],
    [combinedContent],
  ];

  // Creating block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table dynamically
  element.replaceWith(blockTable);
}