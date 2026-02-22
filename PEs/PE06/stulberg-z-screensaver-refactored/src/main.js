import { getRandomColor, getRandomInt } from "./utils.js";
import { drawRectangle, drawArc, drawLine } from "./canvas-utils.js";

let ctx;
let paused = false;
let canvas;
let createRectangles = true;
let createArcs = true;
let createLines = true;

const init = () => {
    console.log("page loaded!");
    // #2 Now that the page has loaded, start drawing!

    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");

    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");

    // C - Draw a rectangle using the drawRectangle() helper function
    drawRectangle(ctx, 20, 20, 600, 440, "red");

    setupUI();

    update();
};

let lastUpdateTime = 0;
const update = (ts) => {
    if (paused) return;
    requestAnimationFrame(update);
    if (ts - lastUpdateTime < 100) {
        return;
    }
    lastUpdateTime = ts;

    if (createRectangles) drawRandomRect(ctx);
    if (createArcs) drawRandomArc(ctx);
    if (createLines) drawRandomLine(ctx);
};

// event handlers
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);
    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(10, 40);
        let color = getRandomColor();
        drawArc(ctx, x, y, radius, color);
    }
};

// canvas helpers
const drawRandomRect = (ctx) => {
    // drawRectangle(ctx, x, y, width,
    //   height, fillStyle = "black", lineWidth = 0, strokeStyle = "black")
    drawRectangle(ctx, getRandomInt(0, 640), getRandomInt(0, 480),
        getRandomInt(10, 90), getRandomInt(10, 90), getRandomColor(),
        getRandomInt(2, 12), getRandomColor());
};

const drawRandomArc = (ctx) => {
    // drawArc(ctx, x, y, radius, fillStyle = "black", lineWidth = 0,
    //   strokeStyle = "black", startAngle = 0, endAngle = Math.PI * 2)
    drawArc(ctx, getRandomInt(0, 640), getRandomInt(0, 480),
        getRandomInt(1, 40), getRandomColor(),
        getRandomInt(2, 12), getRandomColor());
};

const drawRandomLine = (ctx) => {
    // drawLine(ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black")
    drawLine(ctx, getRandomInt(0, 640), getRandomInt(0, 480),
        getRandomInt(0, 640), getRandomInt(0, 480),
        getRandomInt(2, 12), getRandomColor());
};

// helpers
const setupUI = () => {
    const cbRects = document.querySelector("#cb-rectangles");
    const cbArcs = document.querySelector("#cb-arcs");
    const cbLines = document.querySelector("#cb-lines");

    document.querySelector("#btn-pause").onclick = () => {
        paused = true;
    };

    document.querySelector("#btn-play").onclick = () => {
        if (paused) {
            paused = false;
            update();
        }
    };

    document.querySelector("#btn-clear").onclick = () => {
        ctx.clearRect(0, 0, 640, 480);

        drawRectangle(ctx, 20, 20, 600, 440, "red");
    };

    canvas.onclick = canvasClicked;

    cbRects.onclick = (e) => {
        createRectangles = e.target.checked;
    };

    cbArcs.onclick = (e) => {
        createArcs = e.target.checked;
    };

    cbLines.onclick = (e) => {
        createLines = e.target.checked;
    };

    createRectangles = cbRects.checked;
    createArcs = cbArcs.checked;
    createLines = cbLines.checked;
};

// #1 call the `init` function after the pages loads
init();