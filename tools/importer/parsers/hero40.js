export default function parse(element, {document}) {
  const tabs = element.querySelectorAll('.tab');

  const cells = Array.from(tabs).map((tab) => {
    const title = tab.querySelector('.section__title');
    const description = tab.querySelector('.section__description');
    const image = tab.querySelector('img');

    // Ensure all elements are extracted dynamically and check for missing data
    const titleElement = document.createElement('h2');
    titleElement.textContent = title ? title.textContent.trim() : '';

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description ? description.textContent.trim() : '';

    const imageElement = document.createElement('img');
    if (image) {
      imageElement.setAttribute('src', image.src);
      imageElement.setAttribute('alt', image.alt || '');
    }

    return [titleElement, descriptionElement, imageElement];
  });

  // Create the table header matching the example exactly
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cells
  ], document);

  element.replaceWith(table);
}