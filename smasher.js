let bugs = [];
let score;
let life;
let totalClicks; // how many times the user has clicked (for accuracy)
let playing; // aids with asychronous endGame() function
let speed; // speed at which the bugs travel
let bugChance; // chance of a new bug being pushed
let button;
let bg;
let song;
let tapSound;
let boomSound;
let life3;
let life2;
let life1;
let life0;
let trophy;

function setup() {
    bg = loadImage('images/bg-mobile.jpg');
    life3 = loadImage('images/life-3.png');
    life2 = loadImage('images/life-2.png');
    life1 = loadImage('images/life-1.png');
    life0 = loadImage('images/life-0.png');
    trophy = loadImage('images/trophy.png');

    // song = loadSound('audio/bg-sound.mp3');
    // tapSound = loadSound('audio/tap-sound.wav');
    // boomSound = loadSound('audio/boomb-sound.wav');

    createCanvas(400, 600);
    score = 0;
    totalClicks = 0;
    playing = true;
    speed = 8;
    bugChance = 0.8;
    textSize(30);
}

function draw() {
    background(bg);
    handleBugs();
    attemptNewBug(frameCount);
    handleDifficulty(frameCount, score);
    drawScore();
    gameOver(playing);
}

/**
 * handles user input
 * squashes bugs
 */
function mousePressed() {
    for (var i = 0; i < bugs.length; i++) {
        // update bug's state
        bugs[i].squashed = bugs[i].squashedBy(mouseX, mouseY);
        // tapSound.play();

        // if the bug is good, end the game
        if (bugs[i].squashed && bugs[i].type) {
            score--;
            endGame();
            // boomSound.play();
        }
    }

    // song.play();

    totalClicks++;
}

/**
 * updates and draws bugs
 * handles off-screen bugs
 * handles bugs array
 */
function handleBugs() {
    life = 3;
    for (var i = bugs.length - 1; i >= 0; i--) {
        bugs[i].update();
        bugs[i].draw();
        if (life === 3) {
            image(life3, 320, 0, 70, 50);
        } else if (life === 2) {
            image(life2, 320, 0, 70, 50);
        } else if (life === 1) {
            image(life1, 320, 0, 70, 50);
        }

        if (bugs[i].position.y > height && !bugs[i].type) {
            // if the bug is off the screen and it's a bad bug
            life--;
            if (life === 0) {
                image(life0, 320, 0, 70, 50);
                endGame();
            }

        }

        if (bugs[i].squashed) {
            // remove from bugs array
            bugs.splice(i, 1);
            score++;
        }
    }
}

/**
 * attempts to push a new bug
 */
function attemptNewBug(frame) {
    if (frame % 30 === 0) { // every second
        if (random() < bugChance) { // probability of a new bug
            var x = random(width / 2) + width / 4; // only in the middle
            var type = (random() > 0.8);
            const logo = new Logo(x, type);// good or bad bug
            bugs.push(logo);
        }
    }
}

/**
 * variables pertaining to difficulty
 * is set based upon frame and score
 */
function handleDifficulty(frame, score) {
    if (frame % 30 === 0) {
        // update once every second
        bugChance = map(score, 0, 500, 0.4, 0.999);
        speed = map(score, 0, 500, 3, 30);
    }
}

/**
 * draws game over message
 */
function gameOver(playing) {
    if (!playing) {
        // only if the game has ended
        fill(255);
        noStroke();
        textSize(60);
        textAlign(CENTER);
        text("Game Over!", width / 2, height / 2);
        // prevent division by zero
        totalClicks = (totalClicks === 0) ? 1 : totalClicks;
        var accuracy = Math.round(score / totalClicks * 100);
        textSize(30);
        text("Total Score: " + accuracy + "%", width / 2, height / 2 + 70);
        textAlign(LEFT);
        textSize(30);
    }
}

/**
 * draws the score
 */
function drawScore() {
    image(trophy, 0, 10, 30, 30);
    fill(255);
    noStroke();
    text(score, 30, 35);
}

/**
 * stops the loop, triggers game over
 */
function endGame() {
    playing = false;
    noLoop();
    replayButton();
}

function replayButton() {
    button = createButton('Replay');
    button.center();
    button.style('padding', '16px 32px');
    button.style('borderRadius', '5px');
    button.style('border', 'none');
    button.position(width / 2.5, (height + 200) / 2);

    button.mousePressed(function () {
        window.location.reload();
    });
}