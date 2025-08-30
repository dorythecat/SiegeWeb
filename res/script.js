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
    meeple = new Image();
    meeple.src = meepleImageSrc;

    meeple.onload = () => {
        let imgWidth = meeple.width / 16;
        let imgHeight = meeple.height / 16;
        if (imgWidth > canvas.width / 12) {
            imgWidth = canvas.width / 12;
            imgHeight = (meeple.height / meeple.width) * imgWidth;
        }
        const imgX = x - imgWidth / 2;
        const imgY = y - imgHeight / 2 - 20; // Make it walk above the path

        ctx.drawImage(meeple, imgX, imgY, imgWidth, imgHeight);
    }

    meeple.onerror = () => { console.error('Failed to load image at ' + meeple.src); }
}

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

addMeeple(points[0].x, points[0].y); // Add before castles but after path

for (let i = 0; i < points.length; i++) {
    addCastleImage(points[i].x, points[i].y, texts[i]);
}