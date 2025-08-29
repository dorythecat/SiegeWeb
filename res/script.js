// Draw a smooth, dotted path on a canvas element

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 3;

// Function to draw a smooth, dotted path
function drawDottedPath(points) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#ab895f';
    ctx.setLineDash([40, 80]); // Dotted line pattern

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 2; i++) {
        const cpX = (points[i].x + points[i + 1].x) / 2;
        const cpY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpX, cpY);
    }

    // For the last two points
    ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[points.length - 1].x,
        points[points.length - 1].y
    );

    ctx.stroke();
}

// Points from top center to bottom center
const points = [
    { x: canvas.width / 3, y: 0 },
    { x: 3 * canvas.width / 4, y: canvas.height * 0.25 },
    { x: canvas.width / 3, y: canvas.height * 0.5 },
    { x: canvas.width / 4, y: canvas.height * 0.8 },
    { x: canvas.width / 2, y: canvas.height }
];

// Draw the dotted path
drawDottedPath(points);