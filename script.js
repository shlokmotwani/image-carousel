const WIDTH_OF_CAROUSEL = 1000;
const ACTIVE_CIRCLE_COLOR = "#a7f3d0";
const imageURLs = [
  {
    url: "./images/cartoon-8539364_1280.png",
  },
  {
    url: "./images/eggplant-2924511_1280.png",
  },
  {
    url: "./images/fireman-8538075_1280.png",
  },
  {
    url: "./images/monster-8534186_1280.png",
  },
  {
    url: "./images/panda-8536525_1280.png",
  },
];

let mainWrapper = document.querySelector("#main-wrapper");
let imageCarouselOuter = document.querySelector("#image-carousel-outer");
let imageCarouselInner = document.querySelector("#image-carousel-inner");
let leftButton = document.querySelector("#left-button");
let rightButton = document.querySelector("#right-button");
let totalItems;
let circlesArray;

leftButton.textContent = "<<<";
rightButton.textContent = ">>>";
imageCarouselInner.style.right = "0px";
circlesArray = [];

function initialiseCarousel() {
  for (let i = 0; i < imageURLs.length; i++) {
    let image = new Image();
    image.src = imageURLs[i].url;
    let div = document.createElement("div");
    div.appendChild(image);
    imageCarouselInner.appendChild(div);
  }
  totalItems = imageCarouselInner.children.length;
}

function addEventListeners() {
  leftButton.addEventListener("click", () => {
    move(-1 * WIDTH_OF_CAROUSEL);
  });

  rightButton.addEventListener("click", () => {
    move(WIDTH_OF_CAROUSEL);
  });
}

function move(step) {
  let currentRightValue = imageCarouselInner.style.right.slice(0, -2);
  circlesArray[currentRightValue / 1000].style.background = "none";
  currentRightValue = +currentRightValue + step;

  if (currentRightValue < 0) {
    currentRightValue += totalItems * WIDTH_OF_CAROUSEL;
  } else if (currentRightValue > (totalItems - 1) * WIDTH_OF_CAROUSEL) {
    currentRightValue = 0;
  }
  imageCarouselInner.style.right = currentRightValue + "px";
  circlesArray[currentRightValue / 1000].style.backgroundColor =
    ACTIVE_CIRCLE_COLOR;
}

function enableSlideshow() {
  setInterval(() => {
    move(WIDTH_OF_CAROUSEL);
  }, 5000);
}

function addNavigationCircles() {
  let navigationCirclesWrapper = document.createElement("div");
  navigationCirclesWrapper.id = "navigation-circles-wrapper";
  for (let i = 0; i < totalItems; i++) {
    let circle = document.createElement("div");
    circle.classList.add("navigation-circles");
    navigationCirclesWrapper.appendChild(circle);

    circle.addEventListener("click", () => {
      let currentRightValue = +imageCarouselInner.style.right.slice(0, -2);
      let newValue = i * 1000;
      move(newValue - currentRightValue);
    });
    circlesArray.push(circle);
  }
  mainWrapper.appendChild(navigationCirclesWrapper);
}

initialiseCarousel();
addEventListeners();
enableSlideshow();
addNavigationCircles();
move(0);
