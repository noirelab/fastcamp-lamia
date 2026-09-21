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
  orders: [{ productId: "1", price: 200 }],
  register() {
    return "a";
  },
};

const printLog = (message: string) => {};

printLog(user.password!);

// onions
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
    return "regsitrado";
  },
};

// interfaces
interface UserInterface {
  readonly firstName: string;
  email: string;
  login(): string;
}

const emailUser: UserInterface = {
  email: "kaique@gmail.com",
  firstName: "kaique",
  login() {
    return "a";
  },
};

interface AuthorInterface {
  books: string[];
}

const newAuthor: UserInterface & AuthorInterface = {
  email: "kaique@gmail.com",
  firstName: "kaique",
  books: [],
  login() {
    return "a";
  },
};

type Grade = number | string;
const grade: Grade = 1;
