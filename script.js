const canvas = document.getElementById('drawingArea');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    drawPoint(x, y);
});

clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}