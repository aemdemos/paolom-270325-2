export default function parse(element, {document}) {
    const cells = [];

    // Check and add header row dynamically
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Accordion';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Process accordion items
    const accordionItems = element.querySelectorAll('.wp-block-commvault-v3-accordion-item-v3');
    accordionItems.forEach((item) => {
        const titleElement = item.querySelector('.accordion-item__title');
        const contentElement = item.querySelector('.item-innerblocks');

        if (titleElement && contentElement) {
            const titleCell = document.createElement('div');
            titleCell.textContent = titleElement.textContent.trim();

            const contentCell = document.createElement('div');
            contentCell.innerHTML = contentElement.innerHTML.trim();

            // Handle missing content gracefully
            if (!contentCell.innerHTML) {
                contentCell.textContent = "No content available";
            }

            cells.push([titleCell, contentCell]);
        }
    });

    // Create and replace block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}