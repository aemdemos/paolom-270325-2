export default function parse(element, { document }) {
    // Ensure dynamic extraction of content
    const imageDiv = element.querySelector('.newsletter-image img');
    const image = document.createElement('img');
    image.src = imageDiv ? imageDiv.getAttribute('src') : '';
    image.alt = imageDiv ? imageDiv.getAttribute('alt') : '';

    // Extract the title dynamically and handle edge cases
    const titleElement = element.querySelector('.newsletter-block__title');
    const title = document.createElement('h1');
    title.innerHTML = titleElement ? titleElement.innerHTML : '';

    // Extract the subheading dynamically and handle edge cases
    const subheadingElement = element.querySelector('.newsletter__text-inner-wrapper > p');
    const subheading = document.createElement('p');
    subheading.innerHTML = subheadingElement ? subheadingElement.innerHTML : '';

    // Extract the call-to-action (CTA) dynamically and handle edge cases
    const ctaElement = element.querySelector('.scalable-cta-buttons a');
    const cta = document.createElement('a');
    cta.href = ctaElement ? ctaElement.getAttribute('href') : '#';
    cta.target = ctaElement ? ctaElement.getAttribute('target') : '_self';
    cta.textContent = ctaElement ? ctaElement.querySelector('span')?.textContent || '' : '';

    // Create the table header using proper HTML elements and match example headers exactly
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];

    // Create the table using WebImporter.DOMUtils.createTable
    const cells = [
        headerRow, // Header row with exact match
        [[image, title, subheading, cta]] // Content row
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}