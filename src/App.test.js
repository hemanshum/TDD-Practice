import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCameWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //Click the button
  fireEvent.click(colorButton);

  //expect bg color blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disabled button on the first click and disabled on the 2nd click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button", { name: "Change to blue" });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("Disable button has gray background and revert to red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: red");
});

test("Disable button has gray background and revert to blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //change button to blue
  fireEvent.click(colorButton);

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: gray");

  //re-enable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle("background-color: blue");
});

//Unit Testing Functions
describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCameWithSpaces("Red")).toBe("Red");
  });
  test("Work for one inner capital letter", () => {
    expect(replaceCameWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCameWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
