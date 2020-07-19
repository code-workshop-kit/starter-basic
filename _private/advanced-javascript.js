// Final result code
class Animal {
  constructor(props) {
    for (const [prop, value] of Object.entries(props)) {
      this[prop] = value;
    }
  }
}

class Zoo {
  constructor({ name = "Zoo", ...props } = {}) {
    this.name = name;
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
    this.employPeople();
    this.startLife();
    console.log(`Welcome to ${this.name}`, this.size);
    console.log(`Life has started :)! ${this.slogan}`);
  }

  async employPeople() {
    const response = await fetch("https://reqres.in/api/users?delay=2");
    const result = await response.json();
    const { data } = result;
    this.employees = data;
    console.log("We employed people!");
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
            zoo: this,
            dyingCallback: function () {
              console.log(
                `${type}: Yo im dying man please give me some food :(`
              );
            },
            deadCallback: function () {
              console.log(
                `${type}: I DIED, RIP :'(, I blame ${this.zoo.employees[0].first_name}`
              );
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

        return {
          ...animal,
          hunger: newHunger,
        };
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
