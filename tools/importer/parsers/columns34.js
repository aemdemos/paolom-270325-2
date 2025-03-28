export default function parse(element, {document}) {
  // Create the header row for the table
  const blockName = document.createElement('strong');
  blockName.textContent = 'Columns';

  // Extract the image from the first column dynamically
  const imageColumn = element.querySelector('.wp-block-column:nth-child(1) img');
  let image;
  if (imageColumn) {
    image = document.createElement('img');
    image.src = imageColumn.src;
    image.alt = imageColumn.alt || '';
  } else {
    image = document.createTextNode(''); // Handle missing image
  }

  // Extract the text from the second column dynamically
  const textColumn = element.querySelector('.wp-block-column:nth-child(2) h3');
  const text = document.createElement('p');
  text.textContent = textColumn ? textColumn.textContent : ''; // Handle missing text

  // Create the table structure
  const cells = [
    [blockName],
    [image, text]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}