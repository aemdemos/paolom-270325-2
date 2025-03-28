export default function parse(element, {document}) {
  // Helper function to create table
  const cells = [];

  // Block Name Header Row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Background Image
  const backgroundImage = element.querySelector('[style*="background-image"]');
  let bgImageUrl = '';
  if (backgroundImage) {
    const bgStyle = backgroundImage.style.backgroundImage;
    bgImageUrl = bgStyle.slice(5, -2); // Extract URL from 'url("...")'
  }
  const imageElement = document.createElement('img');
  imageElement.src = bgImageUrl.replace('ttps://', 'https://'); // Fix URL formatting issue

  // Title
  const titleElement = element.querySelector('h1');
  let title = null;
  if (titleElement) {
    title = document.createElement('h1');
    title.textContent = titleElement.textContent;
  }

  // Subheading
  const subheadingElement = element.querySelector('p');
  let subheading = null;
  if (subheadingElement) {
    subheading = document.createElement('p');
    subheading.innerHTML = subheadingElement.innerHTML;
  }

  // Call-to-Action Buttons
  const buttonContainer = element.querySelector('.wp-block-buttons');
  let buttons = [];
  if (buttonContainer) {
    buttons = Array.from(buttonContainer.querySelectorAll('a')).map((link) => {
      const buttonElement = document.createElement('a');
      buttonElement.href = link.href;
      buttonElement.textContent = link.textContent.trim(); // Ensure no trailing whitespace or newlines
      return buttonElement;
    });
  }

  // Construct Content Row
  const contentRow = [];
  const contentContainer = document.createElement('div');
  if (imageElement) {
    contentContainer.appendChild(imageElement);
  }
  if (title) {
    contentContainer.appendChild(title);
  }
  if (subheading) {
    contentContainer.appendChild(subheading);
  }
  if (buttons.length > 0) {
    contentContainer.append(...buttons);
  }

  contentRow.push(contentContainer);
  cells.push(contentRow);

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}