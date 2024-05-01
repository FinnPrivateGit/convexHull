const canvas = document.getElementById('drawingArea');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const visualizeON3Button = document.getElementById('visualizeON3');
const visualizeONhButton = document.getElementById('visualizeONh');

let points = []; //to store the coords of the points
let visualizationInProgress = false; //prevent drawing points during visualization

// Code to get coords for points (drawing and saving)
canvas.addEventListener('click', function(event) {
    if (!visualizationInProgress) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        drawPoint(x, y);
        points.push({x, y});
        localStorage.setItem('points', JSON.stringify(points)); //save the points in the local storage (as strings)
    }
});

// Code to clear the canvas
clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    localStorage.removeItem('points'); //remove the points from the local storage
    visualizationInProgress = false; //stop visualization
    visualizeON3Button.disabled = false; //enable the buttons
    visualizeONhButton.disabled = false;
});

// Code to draw points on canvas
function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

// Code to visualize convex hull in O(n^3)
visualizeON3Button.addEventListener('click', function() {
    visualizationInProgress = true;
    visualizeONhButton.disabled = true; //disable the other button
    const savedPoints = JSON.parse(localStorage.getItem('points')); //get the points from the local storage
});

// Code to visualize convex hull in O(nh)
visualizeONhButton.addEventListener('click', function() {
    visualizationInProgress = true;
    visualizeON3Button.disabled = true; //disable the other button
    const savedPoints = JSON.parse(localStorage.getItem('points')); //get the points from the local storage
});
