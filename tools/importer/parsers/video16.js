export default function parse(element, {document}) {
  const cells = [];

  // Add header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Video';
  cells.push(headerRow);

  // Extract video URL
  const iframeElement = element.querySelector('iframe');
  const videoUrl = iframeElement ? iframeElement.src : '';

  // Extract poster image
  const posterElement = element.querySelector('.vidyard-player-embed.inserted');
  const posterImage = posterElement ? posterElement.getAttribute('src') : '';

  const videoContent = [];
  if (posterImage) {
    const img = document.createElement('img');
    img.src = posterImage;
    videoContent.push(img);
  }
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    videoContent.push(link);
  }

  cells.push([videoContent]);

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}