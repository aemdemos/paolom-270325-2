export default function parse(element, {document}) {
  const cells = [];

  // Header row containing block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extract content rows
  const quotes = element.querySelectorAll('.wp-block-commvault-v2-quote-card');
  quotes.forEach((quoteCard) => {
    const quoteRow = [];
    const attributionRow = [];

    // Extract quote
    const quoteText = quoteCard.querySelector('.cmvlt-component-card__title');
    if (quoteText) {
      quoteRow.push(quoteText.cloneNode(true));
    }

    // Extract attribution and source
    const authorName = quoteCard.querySelector('.author_name');
    const authorRole = quoteCard.querySelector('.author_role');
    const attributionContent = [];

    if (authorName) {
      attributionContent.push(authorName.cloneNode(true));
    }
    if (authorRole) {
      attributionContent.push(authorRole.cloneNode(true));
    }

    attributionRow.push(attributionContent);

    // Push rows to cells
    cells.push(quoteRow);
    cells.push(attributionRow);
  });

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}