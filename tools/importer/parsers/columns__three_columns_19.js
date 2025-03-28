export default function parse(element, {document}) {
  const cards = element.querySelectorAll('.cmvlt-component-card');

  const cells = Array.from(cards).map((card) => {
    const imageWrapper = card.querySelector('.cmvlt-component-card__image-wrapper img');
    const image = document.createElement('img');
    if (imageWrapper) {
      image.src = imageWrapper.src;
      image.alt = imageWrapper.alt || '';
    }

    const title = card.querySelector('.cmvlt-component-card__title');
    const heading = document.createElement('h4');
    if (title) {
      heading.textContent = title.textContent.trim();
    }

    const button = card.querySelector('.scalable-cta-button a');
    const buttonLink = document.createElement('a');
    if (button) {
      buttonLink.href = button.href;
      buttonLink.textContent = button.querySelector('span') ? button.querySelector('span').textContent.trim() : '';
    }

    return [image, heading, buttonLink];
  });

  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const table = WebImporter.DOMUtils.createTable([headerRow, ...cells], document);

  element.replaceWith(table);
}