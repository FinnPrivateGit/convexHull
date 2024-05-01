const canvas = document.getElementById('drawingArea');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const visualizeON3Button = document.getElementById('visualizeON3');
const visualizeONhButton = document.getElementById('visualizeONh');

let points = []; //to store the coords of the points
let visualizationInProgress = false; //prevent drawing points during visualization
let pointCount = 0; //to count the number of points already drawn
let maxPoints = 15; //maximum number of points to draw
let isRunning = false; //stopping/starting algo

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
    isRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    localStorage.removeItem('points'); //remove the points from the local storage
    visualizationInProgress = false; //stop visualization
    visualizeON3Button.disabled = false; //enable the buttons
    visualizeONhButton.disabled = false;
    pointCount = 0; //reset the point counter
    visualizeON3Button.classList.remove('button-active'); //remove outline from buttons
    visualizeONhButton.classList.remove('button-active');

    setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 300); //delay higher than algo delay (that canvas is always empty)
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

    isRunning = true;
    convexHullON3(savedPoints); //call function

});

// Code for ONh button
visualizeONhButton.addEventListener('click', function() {
    visualizationInProgress = true;
    visualizeON3Button.disabled = true; //disable buttons
    visualizeONhButton.disabled = true;
    const savedPoints = JSON.parse(localStorage.getItem('points')); //get the points from the local storage
    visualizeONhButton.classList.add('button-active'); //adding outline to button

    isRunning = true;
    convexHullONh(savedPoints); //call function

});

// Code to visualize convex hull in O(n^3)
async function convexHullON3(points) {
    const n = points.length;
    let redLines = new Set(); //to store the red lines

    for (let i = 0; i < n; i++) {
        if (!isRunning) break;

        for (let j = 0; j < n; j++) {
            if (!isRunning) break;

            let q = points[i], r = points[j];
            let isEdge = true;

            //continue if theres a red line already
            if (redLines.has(`${q.x},${q.y}-${r.x},${r.y}`) || redLines.has(`${r.x},${r.y}-${q.x},${q.y}`)) {
                continue;
            }

            //draw blue line between q and r
            ctx.beginPath();
            ctx.moveTo(q.x, q.y);
            ctx.lineTo(r.x, r.y);
            ctx.strokeStyle = 'blue';
            ctx.stroke();

            await new Promise(resolve => setTimeout(resolve, 200)); //1 sec delay

            for (let k = 0; k < n; k++) {
                if (!isRunning) break;

                if (k === i || k === j) continue;

                let p = points[k];
                let crossProduct = (r.x - q.x) * (p.y - q.y) - (r.y - q.y) * (p.x - q.x);

                if (crossProduct > 0) {
                    isEdge = false;
                    break;
                }
            }
            if (isEdge) {
                //change line color to red (symbolizes final edgeKante)
                ctx.beginPath();
                ctx.moveTo(q.x, q.y);
                ctx.lineTo(r.x, r.y);
                ctx.strokeStyle = 'red';
                ctx.stroke();

                //add red line to set
                redLines.add(`${q.x},${q.y}-${r.x},${r.y}`);

            } else {
                //change line color to grey (symbolizes not final edgeKante)
                ctx.beginPath();
                ctx.moveTo(q.x, q.y);
                ctx.lineTo(r.x, r.y);
                ctx.strokeStyle = 'grey';
                ctx.stroke();
            }
            await new Promise(resolve => setTimeout(resolve, 200)); //1 sec delay
        }
    }
}

// Code to visualize convex hull in O(nh)
function convexHullONh(points) {
    //TODO: Code for O(nh) visualization
}
