export default function parse(element, {document}) {
  const cells = [];

  // Header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = "Columns";
  cells.push(headerRow);

  // Extract content for the three columns
  const column1Content = [
    document.createElement('h2'),
    document.createElement('p'),
  ];
  column1Content[0].textContent = "Column 1";
  column1Content[1].textContent = "This and that";

  const column2Content = [
    document.createElement('h2'),
    document.createElement('p'),
  ];
  column2Content[0].textContent = "Column 2";
  column2Content[1].textContent = "This and that";

  const column3Content = [
    document.createElement('h2'),
    document.createElement('p'),
  ];
  column3Content[0].textContent = "Column 3";
  column3Content[1].textContent = "This and that";

  // Add the content as a row
  cells.push([column1Content, column2Content, column3Content]);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}