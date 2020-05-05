class Obstacle {
  constructor(size, pos, traversable, effect, nom, type) {
    this.size = size;
    this.pos = pos;
    this.traversable = traversable;
    this.effect = effect;
    this.nom = nom;
    this.type = type;

    this.updateType = valeurType => {
      this.type = valeurType;
    };
  }
}
