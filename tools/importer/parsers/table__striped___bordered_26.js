export default function parse(element, {document}) {
    // Create header row matching the example exactly
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Table (striped & bordered)';
    const headerRow = [headerCell];

    // Extract rows from the tbody element and dynamically structure cells
    const rows = [...element.querySelectorAll('tr')];

    // Parse each row and ensure all cells are properly wrapped
    const cells = rows.map(row => {
        const columns = [...row.children];
        return columns.map(column => {
            const clonedContent = column.cloneNode(true); // Clone original content
            return clonedContent; // Ensure content is properly wrapped
        });
    });

    // Add header row to the top of the table
    cells.unshift(headerRow);

    // Create the table structure using WebImporter.DOMUtils
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table structure
    element.replaceWith(blockTable);
}