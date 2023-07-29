export function getMimeType(filename: string) {
  const fileExtension = filename.split('.').pop();
  switch (fileExtension) {
    case 'pdf':
      return 'application/pdf';
    case 'zip':
    case 'epub':
      return 'application/epub+zip';
    case 'djvu':
      return 'application/djvu';
    default:
      return `application/${fileExtension}`;
  }
}
