interface IPerson {
  id: number;
  sayMyName(): string;
}

class Person implements IPerson {
  readonly id: number;
  protected name: string;
  private age: number;

  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  sayMyName(): string {
    return this.name;
  }
}

// parameter properties: declara e atribui direto no constructor
class PersonRefact {
  constructor(
    readonly id: number,
    protected name: string,
    private age: number
  ) {}
}

class Employee extends Person {
  constructor(id: number, name: string, age: number) {
    super(id, name, age);
  }

  whoAmI() {
    return this.name;
  }
}

const kaique = new Person(1, "kaique", 21);
const refact = new PersonRefact(2, "jane", 30);
const employee = new Employee(3, "doe", 25);

console.log(kaique.sayMyName());
console.log(refact.id);
console.log(employee.whoAmI());
