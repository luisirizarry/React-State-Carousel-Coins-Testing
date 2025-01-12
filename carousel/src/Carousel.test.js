import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("moves to the previous image when clicking the left arrow", function() {
  const { container, getByAltText } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Move to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to be visible
  expect(getByAltText("testing image 2")).toBeInTheDocument();

  // Click the left arrow to go back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to be visible
  expect(getByAltText("testing image 1")).toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("hides the left arrow on the first image and the right arrow on the last image", function() {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // Initially, the left arrow should be hidden, and the right arrow should be visible
  expect(leftArrow).toHaveStyle("visibility: hidden");
  expect(rightArrow).toHaveStyle("visibility: visible");

  // Move to the last image
  const totalImages = TEST_IMAGES.length;
  for (let i = 1; i < totalImages; i++) {
    fireEvent.click(rightArrow);
  }

  // Now, the right arrow should be hidden, and the left arrow should be visible
  expect(leftArrow).toHaveStyle("visibility: visible");
  expect(rightArrow).toHaveStyle("visibility: hidden");
});
