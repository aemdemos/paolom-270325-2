export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const images = Array.from(element.querySelectorAll('.logo-image'));
  const contentRow = images.map((img) => {
    const clonedImg = document.createElement('img');
    clonedImg.src = img.src;
    clonedImg.alt = img.alt;
    clonedImg.width = img.width;
    clonedImg.height = img.height;
    return clonedImg;
  });

  const cells = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
