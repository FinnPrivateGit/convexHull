const canvas = document.getElementById('drawingArea');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
//const visualizeON3Button = document.getElementById('visualizeON3');
//const visualizeONhButton = document.getElementById('visualizeONh');

let points = []; //to store the coords of the points

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    drawPoint(x, y);
    points.push({x, y});
    localStorage.setItem('points', JSON.stringify(points)); //save the points in the local storage (as strings)
});

clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    localStorage.removeItem('points'); //remove the points from the local storage
});

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

/*
visualizeON3Button.addEventListener('click', function() {
    // Code to visualize convex hull in O(n^3)
});

visualizeONhButton.addEventListener('click', function() {
    // Code to visualize convex hull in O(nh)
});
*/