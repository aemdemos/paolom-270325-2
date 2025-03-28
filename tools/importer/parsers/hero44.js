export default function parse(element, {document}) {
  // Extract necessary elements from the input HTML
  const title = element.querySelector('.title');
  const subheading = element.querySelector('.subheading');
  const ctaWrapper = element.querySelector('.wp-block-commvault-v2-hero__cta-wrapper a');
  const backgroundImage = element.querySelector('.wp-block-commvault-v2-hero__bg img');

  // Create structured content
  const cells = [];

  // Add header row for block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Add content row as a single cell containing all elements
  const contentRow = [];

  // Add background image if available
  if (backgroundImage) {
    const image = document.createElement('img');
    image.src = backgroundImage.src;
    image.alt = backgroundImage.alt || '';
    contentRow.push(image);
  }

  // Add title as heading
  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title.textContent.trim();
    contentRow.push(heading);
  }

  // Add subheading if available
  if (subheading) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = subheading.innerHTML.trim();
    contentRow.push(paragraph);
  }

  // Add call-to-action if available
  if (ctaWrapper) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaWrapper.href;
    ctaLink.target = ctaWrapper.target;
    ctaLink.textContent = ctaWrapper.textContent.trim();
    contentRow.push(ctaLink);
  }

  // Push the single cell containing all elements into the second row
  cells.push([contentRow]);

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}