//select the needed elements of the screen
const heading = document.querySelector('[data-heading]');

const modes = document.querySelectorAll('[data-mode]');
const reset = document.querySelector('[data-new-color]');
const message = document.querySelector('[data-message]');

const colorDisplay = document.querySelector('[data-color-to-find]');

const container = document.querySelector('[data-colors-container]');
const squares = document.querySelectorAll('[data-square]');

//procude a random RGB color
function createColor() {
  let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  return color;
}

//create a color for each square and put one of them in the rgb tag
function newColors(num) {
  let colorsArray = [];
  for (let i = 0; i < num; i++) {
    let color = createColor();
    squares[i].style.backgroundColor = color;
    colorsArray.push(color);
  }
  let index = Math.floor(Math.random() * num);
  colorDisplay.textContent = colorsArray[index];
}

//produce new colors on page load and on trying again
document.addEventListener('DOMContentLoaded', () => {
  newColors(6);
});
reset.addEventListener('click', () => {
  squares.forEach((square) => {
    if (square.classList.contains('hidden')) {
      newColors(3);
    } else {
      newColors(6);
    }
  });
});

modes.forEach((mode) => {
  mode.addEventListener('click', () => {
    if (mode.textContent === 'Easy') {
      modes[1].classList.remove('selected');
      squares[3].classList.add('hidden');
      squares[4].classList.add('hidden');
      squares[5].classList.add('hidden');
      newColors(3);
      modes[0].classList.add('selected');
    } else {
      modes[0].classList.remove('selected');

      for (let square of squares) {
        square.classList.remove('hidden');
      }
      newColors(6);
      modes[1].classList.add('selected');
    }
  });
});

//handle the clicks on each square, the correct one and the wrong ones
squares.forEach((square) => {
  square.addEventListener('click', () => {
    if (message.classList.contains('disappear')) {
      message.classList.remove('disappear');
    }

    if (square.style.backgroundColor === colorDisplay.textContent) {
      message.textContent = 'correct!';
      colorDisplay.style.backgroundColor = colorDisplay.textContent;
      heading.style.backgroundColor = colorDisplay.textContent;
      squares.forEach((square) => {
        square.style.backgroundColor = colorDisplay.textContent;
      });
    } else {
      message.textContent = 'try again..';
      setTimeout(() => {
        message.classList.add('disappear');
      }, 300);
    }
  });
});
