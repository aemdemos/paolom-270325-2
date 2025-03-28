export default function parse(element, {document}) {
  // Initialize an array to store rows
  const rows = [];
  
  // Dynamically extract content from the element
  const contentItems = element.querySelectorAll('.header-text-wrapper > div');
  if (contentItems.length === 0) {
    // Handle the edge case where no data is present
    rows.push(['No data available']);
  } else {
    contentItems.forEach((item) => {
      rows.push([item.textContent.trim()]);
    });
  }

  // Create the header row dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Table (no header)';

  // Combine header and rows into cells array
  const cells = [headerRow, ...rows];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(tableBlock);
}