const snowflakeImages = [
    'images/snowflakes/snowflake_00.png',
    'images/snowflakes/snowflake_01.png',
    'images/snowflakes/snowflake_02.png',
    'images/snowflakes/snowflake_03.png',
]

const snowflakeDiameter = 64;

const snowflakesStyles = document.createElement('style');
snowflakesStyles.innerText = /*css*/ `
.snowflake {
    pointer-events: none;
    position: fixed;
    display: block;
    width: ${snowflakeDiameter}px;
    aspect-ratio: 1;
    background-size: contain;
    z-index: 100;
}
`

document.head.appendChild(snowflakesStyles);

const snowflakes = [];

const makeSnowflake = () => {
    const snowflakeIndex = Math.floor(Math.random()* snowflakeImages.length);
    const snowflakePath = snowflakeImages[snowflakeIndex];
    const div = document.createElement('div');
    div.className = 'snowflake';
    div.style.backgroundImage = `url(${snowflakePath})`;
    div.spin = (Math.random() - 0.5) * 40;
    div.fall = (Math.random() * 10) + 5;
    div.x = window.innerWidth * Math.random();
    div.y = window.innerHeight * Math.random();
    div.rotation = div.spin * 180;
    document.body.appendChild(div);
    snowflakes.push(div);
}

let lastSnowflakeTime = 0;

const tickSnowflakes = (time) => {
    const seconds = time/1000;
    const delta = seconds - lastSnowflakeTime;
    lastSnowflakeTime = seconds;
    requestAnimationFrame(tickSnowflakes);
    snowflakes.forEach((div) => {
        div.rotation += delta*div.spin;
        div.y += delta*div.fall;
        if (div.y + snowflakeDiameter > window.innerHeight + snowflakeDiameter) {
            div.y = -snowflakeDiameter;
        } 
        div.style.transform = `rotate(${div.rotation}deg) translate3d(${div.x}px, ${div.y}px, 0)`;
    })
}

requestAnimationFrame(tickSnowflakes);

for (let index = 0; index < 50; index++) {
    makeSnowflake();
}
