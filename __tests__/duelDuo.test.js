const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

//Before each test, a new WebDriver instance is created for the Chrome browser.
// Builder class allows you to configure the browser and build a WebDriver instance.
beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

//After each test, the WebDriver is quit
afterEach(async () => {
  await driver.quit();
});
//main tes
describe("Duel Duo tests", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:8000");
  });

  test("page loads with title", async () => {
    await driver.wait(until.titleIs("Duel Duo"), 3000);
  });

  describe("clicking the Draw button", () => {
    beforeEach(async () => {
      const drawBtn = await driver.wait(until.elementLocated(By.id("draw")), 3000);
      await drawBtn.click();
    });

    test("displays the div with id='choices'", async () => {
      const choicesDiv = await driver.wait(until.elementLocated(By.id("choices")), 3000);
      const sectionElement = await driver.findElement(By.css("section"));

      const isChoiceDivDisplayed = await choicesDiv.isDisplayed();
      expect(isChoiceDivDisplayed).toBeTruthy();

      const isChoicesInsideSection = await sectionElement.findElement(By.css("#choices"));
      expect(await isChoicesInsideSection).toBeTruthy();
    });

    test("clicking 'Add to Duo' button displays the div with id='player-duo'", async () => {
      const addToDuoBtn = await driver.wait(
        //elementLocated() is a function that waits until an element matching the given locator is located on the web page.
        //xpath is saying 'selects any <button> element that contains the text "Add to Duo"'
        until.elementLocated(By.xpath("//button[contains(text(), 'Add to Duo')]")),
        3000
      );
      await addToDuoBtn.click();

      const playerDuoDiv = await driver.wait(until.elementLocated(By.id("player-duo")), 3000);
      const isPlayerDuoDivDisplayed = await playerDuoDiv.isDisplayed();
      expect(isPlayerDuoDivDisplayed).toBeTruthy();
    });

    test("clicking 'Removed from Duo' button puts bot back to div with id='choices'", async () => {
      const addToDuoBtn = await driver.wait(
        until.elementLocated(By.xpath("//button[contains(text(), 'Add to Duo')]")),
        3000
      );
      await addToDuoBtn.click();


      const removeFromDuoBtn = await driver.wait(
        //xpath is saying 'selects any <button> element that contains the text "Remove from Duo"'
        until.elementLocated(By.xpath("//button[contains(text(), 'Remove from Duo')]")),
        3000
      );
      await removeFromDuoBtn.click();

      const choicesDiv = await driver.wait(until.elementLocated(By.id("choices")), 3000);
      const isChoiceDivDisplayed = await choicesDiv.isDisplayed();
      expect(isChoiceDivDisplayed).toBeTruthy();
    });
  });
});
