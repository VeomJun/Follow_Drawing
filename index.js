const canvas = document.querySelector("#canvasJS");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#rangeJS");
const color = document.querySelectorAll(".colorJS");
const mode = document.querySelector("#modeJS");
const save = document.querySelector("#saveJS");
const url = document.querySelector(".url-input");
const image = document.querySelector(".sample-image");
const input = url.querySelector(".image-input");

let paint = false;
let fill = false;

canvas.width = "550";
canvas.height = "450";

ctx.strokeStyle = "black";
ctx.lineWidth = 1;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 100, 100);

const stopPaint = () => {
  paint = false;
};

const startPaint = () => {
  paint = true;
};

const mouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (paint === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const rangeChange = (event) => {
  const value = event.target.value;
  ctx.lineWidth = value;
};

const changeColor = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const changeMode = (event) => {
  if (fill === true) {
    fill = false;
    mode.innerText = "채우기";
  } else {
    fill = true;
    mode.innerText = "그리기";
  }
};

const fillCanvas = () => {
  if (fill === true) {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

const saveImage = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Revie-PaintJS🥝";
  link.click();
};

const inputImage = (event) => {
  event.preventDefault();
  const value = input.value;
  console.log(value);
  image.src = value;
  input.value = "";
};

if (canvas) {
  canvas.addEventListener("mousemove", mouseMove);
  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mouseup", stopPaint);
  canvas.addEventListener("mouseleave", stopPaint);
  canvas.addEventListener("click", fillCanvas);
}

if (range) {
  range.addEventListener("input", rangeChange);
}

color.forEach(function (e) {
  e.addEventListener("click", changeColor);
});
// 여기서 변수 color는 색깔을 지니고 있는 모든 팔레트의 집합이다.
// 따라서 이러한 집합 자체에 addEventListener를 적용시키려고 할 때 오류가 발생하는 것이다.

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (save) {
  save.addEventListener("click", saveImage);
}

if (url) {
  url.addEventListener("submit", inputImage);
}
