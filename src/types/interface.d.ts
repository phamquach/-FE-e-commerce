interface User {
    userid: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    role: string;
    avt: string
}

interface UserLogin {
    email: string;
    password: string;
}
interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
}

interface userInformationBuy {
  name: string;
  address: string;
  phone: string;
  quantity?: number;
}

interface Products {
    productId: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryId: number,
}

interface Menus {
    path: string;
    title: string;
    icon: JSX.Element;
}