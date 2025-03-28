export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';

  const accordionItems = element.querySelectorAll('.wp-block-commvault-v2-accordion-item');
  const rows = Array.from(accordionItems).map(item => {
    const title = item.querySelector('.title-wrapper h4');
    const content = item.querySelector('.paragraph p');

    return [title.cloneNode(true), content.cloneNode(true)];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}