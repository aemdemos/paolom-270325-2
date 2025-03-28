export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extracting the call-to-action (CTA) link and text
  const ctaLinkElement = element.querySelector('a');
  const ctaText = ctaLinkElement?.querySelector('span')?.textContent.trim() || '';
  const ctaLink = ctaLinkElement?.getAttribute('href') || '';

  // Create an anchor element for the CTA
  const ctaAnchor = document.createElement('a');
  ctaAnchor.href = ctaLink;
  ctaAnchor.textContent = ctaText;

  // Creating the cells structure for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const cells = [
    [headerRow],  // Header row
    [ctaAnchor] // Content row with the CTA link
  ];

  // Generate the block table
  const blockTable = createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}