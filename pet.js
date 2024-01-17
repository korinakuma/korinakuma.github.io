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

var makeStylesForPet = function () {
    return `
    position: fixed;
    top: -${halfImageSize}px;
    left: -${halfImageSize}px;
    transform: translate(100px, calc(100vh - 100px)) rotate(${petRotation}rad) scale(0.3);
    width: ${petImageSize}px;
    height: ${petImageSize}px;
    background-image: url("images/cupid_bear_spritesheet.png");
    background-position: 0px ${petSpriteIndex * -petImageSize}px;
    `;
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

var handleMouseClick = function (mouseClickEvent) {
    // console.log('what is mouse click event?', mouseClickEvent)
    petSpriteIndex = 1;
    renderPet();
    setTimeout(function () {
        petSpriteIndex = 0;
        renderPet();
    }, 1000)
}

// We added the event listeners to the document instead of the body. 
document.addEventListener('mousemove', handleMouseMove); 
document.addEventListener('click', handleMouseClick);

renderPet(0);