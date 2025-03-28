export default function parse(element, {document}) {
    // Helper function to extract text content
    const extractText = (el) => el ? el.textContent.trim() : '';

    // Extract the content from the input element
    const columns = Array.from(element.querySelectorAll('.item-feature')).map((item) => {
        const title = item.querySelector('.featureTitle');
        const description = item.querySelector('p');

        const titleElement = document.createElement('h3');
        titleElement.textContent = extractText(title);

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = extractText(description);

        return [titleElement, descriptionElement];
    });

    // Create the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    // Create the cells array
    const cells = [
        headerRow,
        columns
    ];

    // Generate the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}