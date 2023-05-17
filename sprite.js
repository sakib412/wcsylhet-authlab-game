// Daniel Shiffman
// http://youtube.com/thecodingtrain
// https://thecodingtrain.com/CodingChallenges/111-animated-sprite.html

// Horse Spritesheet from
// https://opengameart.org/content/2d-platformer-art-assets-from-horse-of-spring

// Animated Sprite
// https://youtu.be/3noMeuufLZY

class Sprite {
  constructor(animation, x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
    this.radius = radius
  }

  show() {
    let index = floor(this.index) % this.len;
    image(this.animation[index], this.x, this.y, this.radius, this.radius);
  }

  updateCoordinate(x,y){
    this.x = x
    this.y = y
  }

  animate() {
    console.log(this.speed)
    this.index += 0.3;
    //this.x += this.speed * 15;

    if (this.x > width) {
      //this.x = -this.w;
    }

    //this.y++;
  }
}