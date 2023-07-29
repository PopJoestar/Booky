export function getUrlRequestParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};

  const queryStringRegex = /\?.*/; // Matches the query string starting with "?"
  const paramRegex = /([^?=&]+)(=([^&]*))?/g; // Matches individual parameters in the query string

  const queryStringMatch = url.match(queryStringRegex);
  if (queryStringMatch) {
    const queryString = queryStringMatch[0].slice(1); // Remove the "?"
    let paramMatch;

    while ((paramMatch = paramRegex.exec(queryString)) !== null) {
      const [, paramName, , paramValue] = paramMatch;
      params[paramName] = paramValue || '';
    }
  }

  return params;
}

export function getFileNameFromDownloadLink(link: string, host?: string) {
  if (host === 'GET') {
    const split_link = link.split('/');
    return decodeURIComponent(split_link[split_link.length - 1]);
  }
  const rawFilename = getUrlRequestParams(link).filename;

  if (rawFilename == null || rawFilename === '') {
    throw new Error(`Undefined filename ${host} ${link}`);
  }

  return decodeURIComponent(rawFilename);
}
