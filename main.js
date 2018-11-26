var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var initialPoint = [450,700]

var trianglePoints = [[50,750],[400,143.78],[750,750]]


//initialize triange shape on canvas
let initialTriangle = (trianglePoints) => {
    ctx.beginPath();
    ctx.moveTo(trianglePoints[1][0],trianglePoints[1][1]);
    ctx.lineTo(trianglePoints[2][0],trianglePoints[2][1]);
    ctx.lineTo(trianglePoints[0][0],trianglePoints[0][1]);
    ctx.lineTo(trianglePoints[1][0],trianglePoints[1][1]);
    ctx.stroke()

}

//draw a point on the canvas
let drawPoint = ([x,y],blockSize) => {
    ctx.fillRect(x,y,blockSize,blockSize);
}

//random number generator
let randGen = () => {
    //function to get random number from 0 to 1
    let randFunc = Math.random()

    if(randFunc < (1/3)){
        return 0
    }

    if(randFunc > (1/3) && randFunc < (2/3)){
        return 1
    }

    if(randFunc > (2/3)) {
        return 2
    }
    
}

//vector subtraction
let vectorSub = (point1,point2) => {
    let output = []
    output[0] = Math.abs(point1[0] - point2[0])
    output[1] = Math.abs(point1[1] - point2[1])
    return output
}

let pointGen = (currentPoint) => {
    // console.log('start point: ' + currentPoint)
    let output = []
    //get rand number
    let randVal = randGen()
    // console.log(randVal)
    
    //get triangle point coordinates
    let triPoint = trianglePoints[randVal]

    //get distance from current point to triPoint
    let coordinates = vectorSub(currentPoint, triPoint)
    let h = Math.sqrt((coordinates[0] * coordinates[0]) + (coordinates[1] * coordinates[1]))

    //get theta value of current point
    let theta = Math.atan((currentPoint[1] - triPoint[1])/(currentPoint[0] - triPoint[0]))

    switch (randVal){
        case 0:
            if(currentPoint[0] > 350){
            theta = theta
            } else {
                theta = theta + (Math.PI) 
            }

        case 1:
            if(currentPoint[0] > 350){
                theta = theta + (Math.PI)
            } else {
                theta = theta
            }
        default:
            theta = theta
    }


    // console.log('theta: ' + theta)
    // console.log('theta: ' + (theta / (Math.PI / 180)))

    //get new point distance from triPoint
    let h2 = h / 2
    // console.log('h: ' + h)
    // console.log('h2: ' + h2)

    //get output point

        output[0] = currentPoint[0] + (Math.cos(theta) * h2)
        output[1] = currentPoint[1] + (Math.sin(theta) * h2)
        
    
    // console.log('end point: ' + output)
    // console.log('cos ' + Math.cos(theta))
    // console.log('sin ' + Math.sin(theta))
    return output
}

//function to run afterwords
let step = () => {
    newPoint = pointGen(currentPoint)
    drawPoint(newPoint)
    currentPoint = newPoint
    currentPoint = newPoint
}


//runtime

initialTriangle(trianglePoints)
drawPoint(initialPoint,5)

let currentPoint = initialPoint

//loop
let loop = (maxVal,blockSize) => {
    var i
    var data = []
    var newPoint = []
    for (i = 0; i < maxVal; i++ ){
        newPoint = pointGen(currentPoint)
        drawPoint(newPoint,blockSize)
        data.push({x: newPoint[0], y: newPoint[1]})
        currentPoint = newPoint
    }
    return data
}



