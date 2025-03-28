export default function parse(element, {document}) {
  // Create header row for the block table with no unnecessary wrappers
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns'; // Exact header matches example
  const headerRow = [headerCell];

  // Extract columns from the element dynamically
  const statistics = element.querySelectorAll('.item-statistic');
  const columns = Array.from(statistics).map((statItem) => {
    const titleElement = statItem.querySelector('.statisticTitle');
    const descriptionElement = statItem.querySelector('p');

    // Handle edge cases for missing elements
    const titleText = titleElement ? titleElement.textContent.trim() : '';
    const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

    const titleHTML = document.createElement('h3');
    titleHTML.textContent = titleText;

    const descriptionHTML = document.createElement('p');
    descriptionHTML.textContent = descriptionText;

    return [titleHTML, descriptionHTML];
  });

  // Ensure structure matches example: header row, then columns
  const cells = [headerRow, ...columns.map((column) => [column[0], column[1]])];

  // Create the block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the constructed block
  element.replaceWith(block);
}