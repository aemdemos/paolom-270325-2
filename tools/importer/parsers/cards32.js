export default function parse(element, {document}) {
  const cells = [];

  // Add the header row for the Cards block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract breadcrumb data and organize into rows with proper structure
  const items = element.querySelectorAll('ul.new-breadcrumbs li');

  items.forEach((item) => {
    const link = item.querySelector('a');
    const breadcrumbText = link ? link.textContent.trim() : item.textContent.trim();

    // Generate an image placeholder for the first column
    const imagePlaceholder = document.createElement('img');
    imagePlaceholder.src = 'https://via.placeholder.com/150'; // Placeholder image
    imagePlaceholder.alt = breadcrumbText;

    // Create a div with title and description for the second column
    const textContent = document.createElement('div');

    // Title
    const title = document.createElement('h3');
    title.textContent = breadcrumbText;
    textContent.appendChild(title);

    // Description placeholder
    const description = document.createElement('p');
    description.textContent = 'Description content for ' + breadcrumbText;
    textContent.appendChild(description);

    // Push a row with image in the first column and text content in the second column
    const row = [imagePlaceholder, textContent];
    cells.push(row);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}