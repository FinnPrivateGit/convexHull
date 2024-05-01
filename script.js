const canvas = document.getElementById('drawingArea');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const visualizeON3Button = document.getElementById('visualizeON3');
const visualizeONhButton = document.getElementById('visualizeONh');

let points = []; //to store the coords of the points
let visualizationInProgress = false; //prevent drawing points during visualization
let pointCount = 0; //to count the number of points already drawn
let maxPoints = 5; //maximum number of points to draw

// Code to get coords for points (drawing and saving)
canvas.addEventListener('click', function(event) {
    if (!visualizationInProgress) { //check if visualization is ongoing
        if (pointCount < maxPoints) { //check if to many points have been painted
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            drawPoint(x, y);
            points.push({x, y});
            localStorage.setItem('points', JSON.stringify(points)); //save the points in the local storage (as strings)
            pointCount++; //inc point counter
        } else {
            alert('You have reached the maximum number of points!');
        }
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
    pointCount = 0; //reset the point counter
    visualizeON3Button.classList.remove('button-active'); //remove outline from buttons
    visualizeONhButton.classList.remove('button-active');
});

// Code to draw points on canvas
function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

// Code for ON3 button
visualizeON3Button.addEventListener('click', function() {
    visualizationInProgress = true;
    visualizeONhButton.disabled = true; //disable buttons
    visualizeON3Button.disabled = true;
    const savedPoints = JSON.parse(localStorage.getItem('points')); //get the points from the local storage
    visualizeON3Button.classList.add('button-active'); //adding outline to button

    const generator = convexHullON3(savedPoints); //call function

});

// Code for ONh button
visualizeONhButton.addEventListener('click', function() {
    visualizationInProgress = true;
    visualizeON3Button.disabled = true; //disable buttons
    visualizeONhButton.disabled = true;
    const savedPoints = JSON.parse(localStorage.getItem('points')); //get the points from the local storage
    visualizeONhButton.classList.add('button-active'); //adding outline to button

    const generator = convexHullONh(savedPoints); //call function

});

// Code to visualize convex hull in O(n^3)
function* convexHullON3(points) {
    //TODO: Code for O(n^3) visualization
}

// Code to visualize convex hull in O(nh)
function* convexHullONh(points) {
    //TODO: Code for O(nh) visualization
}
