// Final result code
class Animal {
  constructor(props) {
    for (const [prop, value] of Object.entries(props)) {
      this[prop] = value;
    }
  }
}

class Zoo {
  constructor(props) {
    this.name = props.name;
    this.size = props.size;
  }
}

class AwesomeZoo extends Zoo {
  constructor(props) {
    super(props);
    this.slogan = props.slogan;
    this.species = props.species;
    this.animals = [];
    this.fillCages();
    this.startLife();
    console.log("Welcome to", this.name);
    console.log("Life has started :)!", this.slogan);
  }

  fillCages() {
    this.species.forEach((type) => {
      let starvationRate = Math.round(Math.random() * 10);
      if (starvationRate === 0) {
        starvationRate = 1;
      }

      for (let i = 0; i < Math.round(Math.random() * 20) + 1; i++) {
        this.animals.push(
          new Animal({
            type,
            starvationRate,
            hunger: 0,
            dyingCallback: function () {
              console.log(
                type + ": Yo im dying man please give me some food :("
              );
            },
            deadCallback: function () {
              console.log(type + ": I DIED, RIP :'(");
              this.dead = true;
            },
          })
        );
      }
    });
  }

  startLife() {
    setInterval(() => {
      this.animals = this.animals.map((animal) => {
        const newHunger = animal.hunger + 1 * animal.starvationRate;
        if (!animal.dead && newHunger > 30) {
          animal.deadCallback();
        }

        if (!animal.dead && newHunger > 20) {
          animal.dyingCallback();
        }

        return Object.assign({}, animal, {
          hunger: newHunger,
        });
      });
    }, 1000);
  }
}

const myZoo = new AwesomeZoo({
  name: "Zootopia",
  size: 500,
  slogan: "Like a beast!",
  species: ["monkey", "elephant", "giraffe", "otter"],
});
