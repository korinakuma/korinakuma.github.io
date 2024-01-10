var tau = Math.PI*2;
var petImage = document.createElement('img');
var petDubug = document.createElement('pre');
document.body.appendChild(petDubug);
petDubug.style = `
    position : fixed;
    left : 0;
    bottom : 0;
    `;
petImage.src='images/cupid_bear.png';
document.body.appendChild(petImage);

var makeStylesForRotation = function (rotation) {
    return `
    position: fixed;
    top: -256px;
    left: -256px;
    transform: translate(100px, calc(100vh - 100px)) rotate(${rotation}rad) scale(0.3);
    `;
}

var rotatePet = function (rotation) {
    petImage.style = makeStylesForRotation(rotation);
}

var getPetCenter = function () {
    var boundingRect = petImage.getBoundingClientRect();
    return {
        x : boundingRect.left + (boundingRect.width/2),
        y : boundingRect.top + (boundingRect.height/2),
    }
}

var handleMouseMove = function (mouseMoveEvent) {
    //console.log('what is mouse move event?', mouseMoveEvent)
    var center = getPetCenter();
    var relativeX = mouseMoveEvent.clientX - center.x;
    var relativeY = mouseMoveEvent.clientY - center.y;
    var relativeRotation = Math.atan2(relativeY, relativeX);
    rotatePet(relativeRotation);
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

document.body.addEventListener('mousemove', handleMouseMove);

rotatePet(0);