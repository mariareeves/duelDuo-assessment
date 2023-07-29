const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  beforeEach(async () => {
    await driver.get("http://localhost:8000");
  });

  test("page loads with title", async () => {
    await driver.wait(until.titleIs("Duel Duo"), 9000);
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

// describe("Duel Duo tests", () => {
//   test("page loads with title", async () => {
//     await driver.get("http://localhost:8000");
//     await driver.wait(until.titleIs("Duel Duo"), 9000);
//   });

//   test("clicking the Draw button displays the div with id='choices'", async () => {
//     await driver.get("http://localhost:8000");

//     // Wait for the Draw button to be located
//     const drawBtn = await driver.wait(until.elementLocated(By.id("draw")), 3000);

//     // Click the Draw button
//     await drawBtn.click();

//     // Wait for the 'choices' div to be visible
//     const choicesDiv = await driver.wait(until.elementLocated(By.id("choices")), 3000);

//     // Find the section element containing the 'choices' div
//     const sectionElement = await driver.findElement(By.css("section"));

//     // Check if the 'choices' div is displayed
//     const isChoiceDivDisplayed = await choicesDiv.isDisplayed();
//     expect(isChoiceDivDisplayed).toBeTruthy();

//     // Check if the 'choices' div is inside the section element
//     const isChoicesInsideSection = await sectionElement.findElement(By.css("#choices"));
//     expect(await isChoicesInsideSection).toBeTruthy();
//   });


//   test("clicking 'Add to Duo' button displays the div with id='player-duo'", async () => {
//     await driver.get("http://localhost:8000");

//     // Click the Draw button to display the 'choices' div
//     const drawBtn = await driver.wait(until.elementLocated(By.id("draw")), 3000);
//     await drawBtn.click();

//     // Wait for the 'choices' div to be visible
//     const choicesDiv = await driver.wait(until.elementLocated(By.id("choices")), 3000);

//     // Find the "Add to Duo" button and click it
//     const addToDuoBtn = await choicesDiv.findElement(By.xpath("//button[contains(text(), 'Add to Duo')]"));
//     await addToDuoBtn.click();

//     // Wait for the 'player-duo' div to be visible
//     const playerDuoDiv = await driver.wait(until.elementLocated(By.id("player-duo")), 3000);

//     // Check if the 'player-duo' div is displayed
//     const isPlayerDuoDivDisplayed = await playerDuoDiv.isDisplayed();
//     expect(isPlayerDuoDivDisplayed).toBeTruthy();
//   });

//   test("clicking 'Removed from Duo' button puts bot back to div with id='choices'", async () => {
//     await driver.get("http://localhost:8000");

//     // Click the Draw button to display the 'choices' div
//     const drawBtn = await driver.wait(until.elementLocated(By.id("draw")), 3000);
//     await drawBtn.click();

//     // Click the 'Add to Duo' button for a bot to move it to 'player-duo' div
//     const addToDuoBtn = await driver.wait(
//       until.elementLocated(By.xpath("//button[contains(text(), 'Add to Duo')]")),
//       3000
//     );
//     await addToDuoBtn.click();

//     // Wait for the 'player-duo' div to be visible
//     const playerDuoDiv = await driver.wait(
//       until.elementLocated(By.id("player-duo")),
//       3000
//     );

//     // Find the "Remove from Duo" button and click it to move the bot back to 'choices' div
//     const removeFromDuoBtn = await driver.wait(
//       until.elementLocated(By.xpath("//button[contains(text(), 'Remove from Duo')]")),
//       3000
//     );
//     await removeFromDuoBtn.click();

//     // Wait for the 'choices' div to be visible again
//     const choicesDiv = await driver.wait(until.elementLocated(By.id("choices")), 3000);

//     // Check if the 'choices' div is displayed
//     const isChoiceDivDisplayed = await choicesDiv.isDisplayed();
//     expect(isChoiceDivDisplayed).toBeTruthy();
//   });


// });