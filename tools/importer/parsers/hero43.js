export default function parse(element, {document}) {
  // Critical Review
  // Step 1: Extracting relevant dynamic data
  const controls = element.querySelector('#custom-tab-controls');
  const buttons = controls ? controls.querySelectorAll('button') : [];
  const mobileSelect = element.querySelector('#custom-tab-controls-mobile');
  const options = mobileSelect ? mobileSelect.querySelectorAll('option') : [];

  // Step 2: Creating header row based on the block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Step 3: Creating content row with dynamic content
  const desktopTabs = document.createElement('div');
  if (buttons.length) {
    buttons.forEach((button) => {
      const clonedButton = document.createElement('button');
      clonedButton.textContent = button.textContent;
      desktopTabs.appendChild(clonedButton);
    });
  } else {
    const placeholder = document.createElement('span');
    placeholder.textContent = 'No desktop tabs available';
    desktopTabs.appendChild(placeholder);
  }

  const mobileDropdown = document.createElement('div');
  if (options.length) {
    const selectElement = document.createElement('select');
    options.forEach((option) => {
      const clonedOption = document.createElement('option');
      clonedOption.value = option.value;
      clonedOption.textContent = option.textContent;
      selectElement.appendChild(clonedOption);
    });
    mobileDropdown.appendChild(selectElement);
  } else {
    const placeholder = document.createElement('span');
    placeholder.textContent = 'No mobile dropdown options available';
    mobileDropdown.appendChild(placeholder);
  }

  // Step 4: Creating table with a single column and rows
  const cells = [
    headerRow,
    [desktopTabs, mobileDropdown]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Step 5: Replacing the element with the new table
  element.replaceWith(blockTable);
}