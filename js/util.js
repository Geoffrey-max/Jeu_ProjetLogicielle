class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.plus = other => new Vector2D(this.x + other.x, this.y + other.y);
    this.times = factor => new Vector2D(this.x * factor, this.y * factor);
  }
}

var flipHorizontally = (context, around) => {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
};

var rectAt = (aPos, aSize, bPos, bSize) => {
  return !(
    bPos.x >= aPos.x + aSize.x ||
    bPos.x + bSize.x <= aPos.x ||
    bPos.y >= aPos.y + aSize.y ||
    bPos.y + bSize.y <= aPos.y
  );
};

var obstacleAt = (pos, size, obstacles) => {
  var result = [];
  obstacles.forEach(obstacle => {
    if (rectAt(pos, size, obstacle.obstacle.pos, obstacle.obstacle.size)) {
      result.push(obstacle);
    };
  });
  return result;
}

var bulletAtMonster = (bulletpos, bulletsize, monsters) => {
  var result = [];
  // retourn les index des monstres touché
  monsters.forEach((monster,index) => {
    if (rectAt(bulletpos, new Vector2D(bulletsize,bulletsize), monster.pos, monster.size)) {
      result.push(index);
    };
  });
  return result;
}
