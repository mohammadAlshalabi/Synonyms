const { test } = require('@playwright/test');

test('It should display synonyms in a table with the correct order', async ({ page }) => {
  await page.goto('/');
  await page.route('**/*', route => route.continue());

  await page.locator('[id="synonymsInput"]').fill('bird');
  await page.locator('[data-testid="Submit"]').click();
  const response = await page.waitForResponse(response => response.url().includes('https://api.datamuse.com/words'));
  
  const responseBody = await response.text();
  const elements = await page.$$('[data-testId*="synonyms"]');

  const elementActions = elements.map(async (element, index) => {
    const textContent = await element.textContent();
    test.expect(textContent).toStrictEqual(responseBody[index].word)
  });

  await Promise.all(elementActions);
});
