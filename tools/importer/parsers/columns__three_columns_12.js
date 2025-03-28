export default function parse(element, {document}) {
    // Helper function: WebImporter.DOMUtils.createTable is assumed to be globally accessible

    // Find all item-feature divs within the given element
    const items = element.querySelectorAll('.item-feature');

    // Create header row for the block table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Process each item-feature and prepare cells for the table
    const contentRows = [];
    items.forEach(item => {
        const image = item.querySelector('img');
        const title = item.querySelector('h3');
        const description = item.querySelector('p');

        const imageElement = document.createElement('img');
        imageElement.src = image.src;
        imageElement.alt = image.alt || '';

        const titleElement = document.createElement('h3');
        titleElement.textContent = title.textContent.trim();

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description.textContent.trim();

        contentRows.push([imageElement, titleElement, descriptionElement]);
    });

    // Create the table
    const cells = [
        headerRow,
        ...contentRows
    ];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structured table
    element.replaceWith(blockTable);
}