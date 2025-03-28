export default function parse(element, {document}) {
  // Helper function to extract content from a card column
  function extractCardContent(column) {
    const content = [];

    // Extract the heading
    const heading = column.querySelector('h6');
    if (heading) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      content.push(strong);
    }

    // Extract the link if present
    const link = column.querySelector('.wp-block-button__link');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      content.push(anchor);
    }

    return content.length ? content : [''];
  }

  // Extract columns from the input element
  const columns = element.querySelectorAll('.wp-block-column');

  // Define the header row for the block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  // Build rows for each column
  const rows = Array.from(columns).map(column => [extractCardContent(column)]);

  // Combine header and content rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}