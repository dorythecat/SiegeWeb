const castleImageSrc = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/94151e3a53bfc76ce2a2937766e64798c1f932d9_image.png';
const meepleImageSrc = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0a2fc26201bcb2b02ef8aff23db1ed612b02b564_meeple_blue.png'

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

function addCastleImage(x, y, text) {
    const img = new Image();
    img.src = castleImageSrc;

    img.onload = () => {
        let imgWidth = img.width / 2; // Scale down the image
        let imgHeight = img.height / 2;
        if (imgWidth > canvas.width / 3) {
            imgWidth = canvas.width / 3; // Limit width to a third of canvas width
            imgHeight = (img.height / img.width) * imgWidth; // Maintain aspect ratio
        }
        const imgX = x - imgWidth / 2; // Center the image at (x, y)
        const imgY = y - imgHeight / 2;

        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

        if (text) {
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            text = text.split('\n');
            const textLength = Math.max(...text.map(line => line.length));
            ctx.font = (imgWidth * 2 / textLength) + 'px IM Fell English';
            for (let i = 0; i < text.length; i++) {
                ctx.fillText(text[i], x, imgY + imgHeight + 50 + i * (imgWidth * 2 / textLength));
            }
        }
    }

    img.onerror = () => { console.error('Failed to load image at ' + img.src); }
}

let meeple;
function addMeeple(x, y) {
    meeple = document.createElement('div');
    meeple.style.position = 'absolute';
    meeple.style.width = '50px';
    meeple.style.height = '50px';
    meeple.style.backgroundImage = `url(${meepleImageSrc})`;
    meeple.style.backgroundSize = 'contain';
    meeple.style.backgroundRepeat = 'no-repeat';
    meeple.style.left = (x - 25) + 'px'; // Center the
    meeple.style.top = (y - 25) + 'px'; // Center the
    meeple.style.transition = 'left 0.3s ease, top 0.3s ease'; // Smooth transition
    document.body.appendChild(meeple);
}

// Move meeple smoothly along the path as the user scrolls
window.addEventListener('scroll', () => {
    if (!meeple) return; // Ensure meeple is loaded
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / docHeight;
    const pathLength = points.length;
    const pointIndex = Math.min(Math.floor(scrollFraction * pathLength), pathLength - 1);
    const nextPointIndex = Math.min(pointIndex + 1, pathLength - 1);
    const t = (scrollFraction * pathLength) - pointIndex;
    const x = (1 - t) * points[pointIndex].x + t * points[nextPointIndex].x;
    const y = (1 - t) * points[pointIndex].y + t * points[nextPointIndex].y;

    // Move the meeple to its new position
    meeple.style.left = (x - 25) + 'px';
    meeple.style.top = (y - 25) + 'px';
});

// Points from top center to bottom center
const points = [
    { x: canvas.width / 3, y: canvas.height * 0.1 },
    { x: 3 * canvas.width / 4, y: canvas.height * 0.3 },
    { x: canvas.width / 3, y: canvas.height * 0.5 },
    { x: canvas.width / 4, y: canvas.height * 0.7 },
    { x: canvas.width / 2, y: canvas.height * 0.9 }
];

const texts = [
    "ship every week",
    "vote on the\nbest projects",
    "get prizes",
    "ship all 12 weeks",
    "get a framework"
]

// Draw the dotted path
drawDottedPath(points);

for (let i = 0; i < points.length; i++) {
    addCastleImage(points[i].x, points[i].y, texts[i]);
}

addMeeple(points[0].x, points[0].y);