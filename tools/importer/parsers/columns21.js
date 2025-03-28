export default function parse(element, {document}) {
  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract breadcrumbs
  const breadcrumbList = element.querySelector('.leadership-detail-hero__breadcrumbs ul');
  const breadcrumbs = Array.from(breadcrumbList.querySelectorAll('li')).map(item => {
    const link = item.querySelector('a');
    return link ? link.cloneNode(true) : document.createTextNode(item.textContent.trim());
  });

  // Extract image
  const imageElement = element.querySelector('.leadership-detail-hero__image-wrapper img');
  const image = imageElement ? imageElement.cloneNode(true) : document.createTextNode('No Image Available');

  // Extract name
  const nameElement = element.querySelector('.leadership-detail-hero__sidebar-title');
  const name = document.createElement('strong');
  name.textContent = nameElement ? nameElement.textContent.trim() : 'No Name Provided';

  // Extract title
  const titleElement = element.querySelector('.leadership-detail-hero__sidebar-job');
  const title = document.createTextNode(titleElement ? titleElement.textContent.trim() : 'No Title Provided');

  // Extract LinkedIn profile
  const linkedinContainer = element.querySelector('.leadership-detail-hero__sidebar-linkedin');
  const linkedin = linkedinContainer ? linkedinContainer.cloneNode(true) : document.createTextNode('No LinkedIn Profile');

  // Extract description
  const descriptionElement = element.querySelector('.leadership-detail-hero__text-wrapper');
  const description = descriptionElement ? descriptionElement.cloneNode(true) : document.createTextNode('No Description Available');

  // Create cells array
  const cells = [
    headerRow,
    [
      [image, name, title, linkedin],
      description
    ],
    [breadcrumbs]
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}