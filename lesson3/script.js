// TASK 1

const arr = [3, 6, -2, -10, 6, 2, 4];
function find() {
  let max = arr[0];
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= max) {
      max = arr[i];
    }
    if (arr[i] <= min) {
      min = arr[i];
    }
  }
  return max - min;
}
console.log(find());

//TASK 2

let a = [[4, 6, 2], 8];
let indexI = 0;
let indexJ = 0;
let indexArray = [];

function findIndex(a, b, I, J) {
  for (let i = 0; i <= a.length + 1; i++) {
    for (let j = 0; j <= a.length + 1; j++) {
      if (a[0][i] + a[0][j] === a[1] && i != j) {
        I = i;
        J = j;
      }
    }
  }
  b.push(I, J);
  return b;
}

console.log(findIndex(a, indexArray, indexI, indexJ));

//TASK 3

let picture = document.getElementById("picture");

let left = 0;
let Top = 0;

document.onkeydown = function (event) {
  if (event.key == "ArrowRight") {
    picture.style.left = left + "px";
    left += 10;
  }

  if (event.key == "ArrowDown") {
    picture.style.top = Top + "px";
    Top += 10;
  }
  if (event.key == "ArrowUp") {
    picture.style.top = Top + "px";
    Top -= 10;
  }
  if (event.key == "ArrowLeft") {
    picture.style.left = left + "px";
    left -= 10;
  }
};

//TASK 4

list = [0, 0];

man = document.getElementById("man");
man.style.top = list[0] + "px";
man.style.left = list[1] + "px";
