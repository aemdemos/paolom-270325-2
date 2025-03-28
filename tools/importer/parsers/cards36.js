export default function parse(element, {document}) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  const rows = [headerRow];

  const cards = element.querySelectorAll('.wp-block-commvault-v2-news-card');

  cards.forEach((card) => {
    const image = card.querySelector('.cmvlt-component-card__content img');
    const title = card.querySelector('.cmvlt-component-card__title');
    const description = card.querySelector('.cmvlt-component-card__description');
    const links = card.querySelectorAll('.cmvlt-component-card__cta a');

    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    const textContent = [];

    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title.textContent.trim();
      textContent.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      textContent.push(descriptionElement);
    }

    links.forEach((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.setAttribute('aria-label', link.getAttribute('aria-label'));
      linkElement.target = link.target;
      linkElement.textContent = link.querySelector('span')?.textContent.trim() || 'Learn more';
      textContent.push(linkElement);
    });

    rows.push([imageElement, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}