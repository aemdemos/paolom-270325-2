export default function parse(element, {document}) {
    // Helper function to create tables
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract relevant content from the input element
    const titleElement = element.querySelector('.section__title');
    const eyebrowElement = element.querySelector('.eyebrow');
    const descriptionElement = element.querySelector('.section__description');
    const buttons = element.querySelectorAll('.scalable-cta-button a');
    const imageElement = element.querySelector('.double-side__image');

    // Handle missing or empty data
    const title = titleElement ? document.createElement('h2') : null;
    if (title) {
        title.textContent = titleElement.textContent.trim();
    }

    const eyebrow = eyebrowElement ? document.createElement('span') : null;
    if (eyebrow) {
        eyebrow.textContent = eyebrowElement.textContent.trim();
    }

    const description = descriptionElement ? document.createElement('p') : null;
    if (description) {
        description.textContent = descriptionElement.textContent.trim();
    }

    const ctas = Array.from(buttons).map(button => {
        const link = document.createElement('a');
        link.href = button.href;
        link.textContent = button.textContent.trim();
        return link;
    });

    const image = imageElement ? document.createElement('img') : null;
    if (image) {
        image.src = imageElement.src;
        image.alt = imageElement.alt;
    }

    // Define table structure
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];

    const contentRow = [
        eyebrow,
        title,
        description,
        ...ctas,
        image
    ].filter(cell => cell !== null); // Remove null entries

    const cells = [headerRow, contentRow];

    // Create the block table
    const block = createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}