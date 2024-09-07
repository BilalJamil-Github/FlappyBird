let score = document.getElementById('score');
let scoreNumber = 0;
let main_div = document.getElementById('main_div');
let ball = document.getElementById('ball');
let currentBirdPosition = parseInt(window.getComputedStyle(ball).top);
let gameRunning = true;

document.onkeydown = (e) => {
    switch (e.keyCode) {
        case 13: // Enter key to start the game
            gameinit();
            break;
    }
};

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function gameinit() {
    document.onkeydown = (e) => {
        switch (e.keyCode) {
            case 32: // Space bar to make the bird fly
                currentBirdPosition -= 50;
                if (currentBirdPosition < -50) {
                    currentBirdPosition = -50;
                }
                ball.style.top = currentBirdPosition + "px";
                break;
        }
    };

    while (gameRunning) {
        currentBirdPosition += 20;
        ball.style.top = currentBirdPosition + "px";

        if (currentBirdPosition > window.innerHeight - ball.offsetHeight) {
            alert("Game Over");
            window.location.reload();
            break;
        }

        await wait(200);
        collisonCheck();
    }
}

function hurdlesGenerator() {
    let hurdlespart1 = document.createElement('div');
    let hurdlespart2 = document.createElement('div');
    hurdlespart1.classList.add('hurdle');
    hurdlespart2.classList.add('hurdle');
    
    let gapSize = 150; 
    let maxHeight = window.innerHeight - gapSize;
   
    let hurdlespart1Height = Math.floor(Math.random() * (maxHeight - 50)); 
    hurdlespart1.style.height = hurdlespart1Height + "px";
    hurdlespart1.style.top = '0px';
    hurdlespart1.style.right = '0px';
    main_div.appendChild(hurdlespart1);

    let hurdlespart2Height = window.innerHeight - (hurdlespart1Height + gapSize);
    hurdlespart2.style.height = hurdlespart2Height + "px";
    hurdlespart2.style.top = (hurdlespart1Height + gapSize) + 'px';
    hurdlespart2.style.right = '0px';
    main_div.appendChild(hurdlespart2);
}


function destroyOldHurdles() {
    document.querySelectorAll('.hurdle').forEach(ele => ele.remove());
}

hurdlesGenerator();

async function hurdlesMovement() {
    while (gameRunning) {
        let hurdles = Array.from(document.getElementsByClassName('hurdle'));
        await wait(10);
        hurdles.forEach((element) => {
            let currentRight = parseInt(window.getComputedStyle(element).right);
            element.style.right = (currentRight + 5) + 'px';

            if (currentRight >= window.innerWidth) {
                element.remove();
                scoreNumber += 1;
                score.innerHTML = scoreNumber;
                destroyOldHurdles()
                hurdlesGenerator(); 
            }
        });
    }
}

hurdlesMovement();

function collisonCheck() {
    let hurdles = Array.from(document.getElementsByClassName('hurdle'));
    let birdRect = ball.getBoundingClientRect();

    hurdles.forEach(hurdle => {
        let hurdleRect = hurdle.getBoundingClientRect();

        if (birdRect.right > hurdleRect.left &&
            birdRect.left < hurdleRect.right &&
            birdRect.bottom > hurdleRect.top &&
            birdRect.top < hurdleRect.bottom) {
            gameRunning = false;
            alert("Game Over");
            window.location.reload();
        }
    });
}

// Initialize the game
gameinit();
