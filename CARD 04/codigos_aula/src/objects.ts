type Order = {
  productId: string;
  price: number;
};

type User = {
  firstName: string;
  age: number;
  email: string;
  password?: string;
  orders: Order[];
  register(): string;
};

const user: User = {
  firstName: "Sopa de Cebola",
  age: 20,
  email: "sopa@cebola.com",
  password: "123456",
  orders: [{ productId: "1", price: 200 }],
  register() {
    return "a";
  },
};

const printLog = (message: string) => {
  console.log(message);
};

printLog(user.password!);

// intersection: Author & User
type Author = {
  books: string[];
};

const author: Author & User = {
  age: 2,
  books: ["1"],
  email: "author@gmail.com",
  firstName: "kaique",
  orders: [],
  register() {
    return "registrado";
  },
};

// interfaces: mesmo shape do type User, com readonly no firstName
interface UserInterface {
  readonly firstName: string;
  age: number;
  email: string;
  orders: Order[];
  register(): string;
}

const emailUser: UserInterface = {
  email: "kaique@gmail.com",
  age: 30,
  firstName: "kaique",
  orders: [],
  register() {
    return "a";
  },
};

interface AuthorInterface {
  books: string[];
}

const newAuthor: UserInterface & AuthorInterface = {
  email: "kaique@gmail.com",
  age: 31,
  firstName: "kaique",
  books: [],
  orders: [],
  register() {
    return "a";
  },
};

// union: number | string
type Grade = number | string;
const grade: Grade = 1;

console.log({ author, emailUser, newAuthor, grade });
