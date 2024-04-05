export async function getGoogleFont(
  fontFamily: string,
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
  text: string,
) {
  const url = new URL('https://fonts.googleapis.com/css2');
  url.searchParams.set('family', `${fontFamily}:wght@${weight}`);
  url.searchParams.set('text', text);

  const cssResponse = await fetch(url);

  if (!cssResponse.ok) {
    throw new Error(`Failed to fetch font ${url.toString()}`);
  }

  const css = await cssResponse.text();

  const fontUrl = css.match(/src: url\((.+?)\)/)?.[1];

  if (!fontUrl) {
    throw new Error(`Font url not found in CSS\nURL: ${url.toString()}`);
  }
  const fontResponse = await fetch(fontUrl);

  return fontResponse.arrayBuffer();
}
