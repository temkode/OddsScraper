export function isValidUrl(url: string) {
  const regex = /^https?:\/\/sports\.williamhill\.com\/betting\/en-gb\/horse-racing\/racecard\//;
  return regex.test(url);
}
