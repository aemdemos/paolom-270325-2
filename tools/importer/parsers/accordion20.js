export default function parse(element, {document}) {
    // Create the header row as specified in the requirements
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Accordion';
    const headerRow = [headerCell];

    // Initialize the array to hold all table rows starting with the header row
    const cells = [headerRow];

    // Process all rows in the provided HTML table
    const rows = element.querySelectorAll('tr');
    rows.forEach((row) => {
        const cols = row.querySelectorAll('td');

        if (cols.length === 2) {
            // Handle rows with two columns: extract title and content
            const titleCell = cols[0];
            const contentCell = cols[1];

            // Create elements to store title and content
            const formattedTitle = document.createElement('div');
            formattedTitle.innerHTML = titleCell.innerHTML.trim();

            const formattedContent = document.createElement('div');
            formattedContent.innerHTML = contentCell.innerHTML.trim();

            // Add the row to the cells array
            cells.push([formattedTitle, formattedContent]);
        } else if (cols.length === 1 && cols[0].classList.contains('text-body-xs')) {
            // Handle rows with one column containing additional text
            const formattedContent = document.createElement('div');
            formattedContent.innerHTML = cols[0].innerHTML.trim();
            cells.push(['', formattedContent]);
        }
    });

    // Use WebImporter.DOMUtils.createTable to generate the final table structure
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created table
    element.replaceWith(blockTable);
}