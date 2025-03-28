export default function parse(element, {document}) {
  // Extracting relevant elements
  const navItems = element.querySelectorAll('.wp-block-commvault-v2-page-navigation-item');
  const ctaLink = element.querySelector('.right-nav .nav-cta');

  // Creating the header row to denote block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Tabs';

  const rows = Array.from(navItems).map((item) => {
    const tabLabel = item.querySelector('span')?.textContent?.trim() || 'Unnamed';
    const tabLink = item.querySelector('a')?.getAttribute('href') || '#';

    const tabContent = document.createElement('a');
    tabContent.href = tabLink;
    tabContent.textContent = tabLabel;

    return [tabLabel, tabContent];
  });

  // Add CTA row if present
  if (ctaLink) {
    const ctaText = ctaLink.querySelector('span')?.textContent?.trim() || 'Call to Action';
    const ctaHref = ctaLink.getAttribute('href') || '#';

    const ctaContent = document.createElement('a');
    ctaContent.href = ctaHref;
    ctaContent.textContent = ctaText;

    rows.push(['CTA', ctaContent]);
  }

  // Creating the block table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(table);
}