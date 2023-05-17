function Horse(x, type, speed, width) {

    this.width = width;

    this.selectedImage =  !type ?
        img[Math.floor(Math.random() * img.length)] :
        loadImage('images/boom-1.gif');

    this.origin = x; // from what point to oscillate

    this.position = createVector(0, 0);
    this.serpentine = random(3) + 4; // serpentine distance

    this.type = type; // false = ant, true = bee
    this.squashed = false; // bug state

    this.radius = 60; // size of bug
    this.speed = speed;

    this.frames = spritedata.frames;

    if(animation == null){
        animation = [];
        horses = []
        for (let i = 0; i < this.frames.length; i++) {
            let pos = this.frames[i].frame;
            let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
            animation.push(img);
        }

    }
    this.horse = new Sprite(animation, this.position.x/2, this.position.y/2, 0.4,this.radius);
    this.onRemoving = false;

}

let spritesheet;
let spritedata;
let animation = null;
let horses = null;

function preload() {

    spritedata = loadJSON('sprite/cart.json');
    spritesheet = loadImage('sprite/cart.png');

    this.img  =[];
    for (let i = 1; i < 8; i++) {
        this.img.push(loadImage('images/' + i + '.png'))
    }


}

/**
 * draws the insect based upon type
 */
Horse.prototype.draw = function() {

    if(this.squashed){
        this.horse.show()
        this.horse.animate()
        this.horse.updateCoordinate(
            this.position.x - (this.radius/2),
            this.position.y - (this.radius /2),
        )
    }else{
        image(this.selectedImage,
            this.position.x - (this.radius/2),
            this.position.y - (this.radius /2),
            50,
            50
        )
    }



};

/**
 * forces bugs along their path
 */
Horse.prototype.update = function() {
    this.position.y += speed;
    this.position.x = cos(this.position.y * (0.005 * this.serpentine) + this.serpentine * 10) * (this.width / this.serpentine) + this.origin;
}

/**
 * returns whether or not x & y are within the bug
 */
Horse.prototype.squashedBy = function(x, y) {
    var d = dist(x, y, this.position.x, this.position.y);
    return (d < this.radius);
};