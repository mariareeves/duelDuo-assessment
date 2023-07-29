const shuffle = require("../src/shuffle");

describe("shuffle should...", () => {
  // CODE HERE
  test("return an array", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = shuffle(inputArray);
    expect(Array.isArray(result)).toBe(true);
  });

  test("return an array of the same length as the argument sent in", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = shuffle(inputArray);
    expect(result.length).toBe(inputArray.length);
  });

  test("contain all the same items as the input array", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = shuffle(inputArray);
    const sortedInput = inputArray.slice().sort((a, b) => a - b);
    const sortedResult = result.slice().sort((a, b) => a - b);
    expect(sortedResult).toEqual(sortedInput);
  });

  test("shuffle the items around", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = shuffle(inputArray);
    expect(result).not.toEqual(inputArray);
  });
});
