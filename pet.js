// TODO: Write script to get rid of arrow divs after a certain amount of time? 

var tau = Math.PI*2;
var petBox = document.createElement('div');
var petDubug = document.createElement('pre');
var petImageSize = 512;
var halfImageSize = petImageSize/2;
document.body.appendChild(petDubug);
petDubug.style = `
    position : fixed;
    left : 0;
    bottom : 0;
    `;

document.body.appendChild(petBox);

var petSpriteIndex = 0;
var petRotation = 0;


var makeStylesForSprite = function (config) {
    return `
    position: fixed;
    top: -${halfImageSize}px;
    left: -${halfImageSize}px;
    transform: translate(${config.position.x}px, calc(100vh + ${config.position.y}px)) rotate(${config.rotation}rad) scale(0.3);
    width: ${petImageSize}px;
    height: ${petImageSize}px;
    background-image: url("images/decor/cupid_bear_spritesheet.png");
    background-position: 0px ${config.spriteIndex * -petImageSize}px;
    `;
}

var makeStylesForPet = function () {
    return makeStylesForSprite({
        position: {
            x : 100,
            y : -100,
        },
        rotation : petRotation,
        spriteIndex: petSpriteIndex
    })
}

var renderPet = function () {
    petBox.style = makeStylesForPet();
}

var getPetCenter = function () {
    var boundingRect = petBox.getBoundingClientRect();
    return {
        x : boundingRect.left + (boundingRect.width/2),
        y : boundingRect.top + (boundingRect.height/2),
    }
}



var handleMouseMove = function (mouseMoveEvent) {
    // console.log('what is mouse move event?', mouseMoveEvent)
    var center = getPetCenter();
    var relativeX = mouseMoveEvent.clientX - center.x;
    var relativeY = mouseMoveEvent.clientY - center.y;
    var relativeRotation = Math.atan2(relativeY, relativeX);
    petRotation = relativeRotation;
    renderPet();
    /*
    petDubug.innerText = `
        mouseX : ${mouseMoveEvent.clientX},
        mouseY : ${mouseMoveEvent.clientY},
        centerX : ${center.x},
        centerY : ${center.y},
        relativeX : ${relativeX},
        relativeY : ${relativeY},
        relativeRotation : ${relativeRotation},
    `
    */
}

var arrows = [];

var renderArrow = function (arrow) {
    arrow.domNode.style = makeStylesForSprite(arrow);
}

var makeArrow = function () {
    var arrow = {
        position : {
            x: 100, 
            y: -100,
        },
        rotation : petRotation,
        spriteIndex : 2,
        speed : (0.125 * Math.random()) + 0.25,
        domNode : document.createElement('div'),
    };
    arrows.push(arrow);

    document.body.appendChild(arrow.domNode);
    renderArrow(arrow);
}

var lastTime = 0;

// TODO: Clean up the arrows after they've left the page 
var tickArrows = function (time) {
    var delta = time - lastTime;
    requestAnimationFrame(tickArrows);
    arrows.forEach(function(arrow) {
        var xMotion = Math.cos(arrow.rotation) * (delta * arrow.speed);
        var yMotion = Math.sin(arrow.rotation) * (delta * arrow.speed);
        arrow.position.x += xMotion;
        arrow.position.y += yMotion;
        renderArrow(arrow);
    }); 
    lastTime = time;
}
requestAnimationFrame(tickArrows);

var handleMouseClick = function (mouseClickEvent) {
    // console.log('what is mouse click event?', mouseClickEvent)
    petSpriteIndex = 1;
    renderPet();
    makeArrow();
    setTimeout(function () {
        petSpriteIndex = 0;
        renderPet();
    }, 1000)
}

// We added the event listeners to the document instead of the body. 
document.addEventListener('mousemove', handleMouseMove); 
document.addEventListener('click', handleMouseClick);

renderPet(0);


