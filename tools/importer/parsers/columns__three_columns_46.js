export default function parse(element, {document}) {
  // Helper function to create a table block
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract necessary child elements from the given element
  const heading = element.querySelector('h1');
  const paragraph = element.querySelector('p');
  const buttonLink = element.querySelector('a');
  const image = element.querySelector('img');

  // Create structured header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Create content cell for the first column
  const column1Content = [];
  if (heading) column1Content.push(heading.cloneNode(true));
  if (paragraph) column1Content.push(paragraph.cloneNode(true));
  if (buttonLink) column1Content.push(buttonLink.cloneNode(true));

  // Create content cell for the second column
  const column2Content = [];
  if (image) column2Content.push(image.cloneNode(true));

  // Structure the rows of the table
  const cells = [
    headerRow, // Header row
    [ // Content row
      column1Content,
      column2Content
    ]
  ];

  // Create the table block
  const block = createTable(cells, document);

  // Replace original element with the table block
  element.replaceWith(block);
}