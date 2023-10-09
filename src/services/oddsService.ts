import { launch, Browser, Page } from 'puppeteer';
import { RacerData } from '../interfaces.js';

export async function scrapeRaceInfo(url: string): Promise<any[]> {
  const browser: Browser = await launch();
  const page: Page = await browser.newPage();

  const userAgent = 'OddsScraper/1.0 (temuujin.nat@gmail.com)';
  await page.setUserAgent(userAgent);

  await page.goto(url);
  await page.waitForSelector('.race-card-table-container');

  const raceInfo: RacerData[] = await page.evaluate(() => {
    const rv: RacerData[] = [];

    const raceCardContainerElement = document.querySelector('.race-card-table-container');
    const runnerElements = raceCardContainerElement?.querySelectorAll('tbody tr[role="row"]');

    if (runnerElements) {
      runnerElements.forEach((runnerElement) => {
        const previousOdds: string[] = [];
        const previousOddsElements = runnerElement.querySelectorAll('[class^="previous-odd-"]');
        if (previousOddsElements) {
          previousOddsElements.forEach((oddElement) => {
            previousOdds.push(oddElement.textContent);
          });
        }
        const racerInfo: RacerData = {
          Selection: runnerElement.querySelector('.selection__title')?.textContent || '',
          Jockey: runnerElement.querySelector('[data-test-id="jockey"]')?.textContent || '',
          Trainer: runnerElement.querySelector('[data-test-id="trainer"]')?.textContent || '',
          Age: runnerElement.querySelector('[data-test-id="age"]')?.textContent || '',
          Weight: runnerElement.querySelector('[data-test-id="weight"]')?.textContent || '',
          RP: runnerElement.querySelector('.best-runner')?.textContent || '',
          Win: runnerElement.querySelector('.sp-betbutton')?.textContent || '',
          'Previous Odds': previousOdds,
        };

        rv.push(racerInfo);
      });
    }

    return rv;
  });

  await browser.close();
  return raceInfo;
}
