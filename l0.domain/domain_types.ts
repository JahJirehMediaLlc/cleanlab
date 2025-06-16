export type user = {
id: string,
contact: person,
company: string,
login?: auth_cred,
first_name: string,
last_name: string,
age: number,
dob: string,
ssn: string,
email: string,
phone: string,
address: {
id: string,
user_id: string,
street: string,
bldg_apt: string,
city: string,
state: string,
zip: string
}
}

export type person = {
    id:string;
    first_name: string,
    last_name: string,
    age: number,
    email: string,
    phone: string,
    kids?: person[],
}

export type auth_cred = {
    userid:string,
    pwd:string,
    email:string,
}

export type customer = {
id:string,
companyName: string,
phone: string,
contact: {
id: string,
firstname: string,
lastname: string,
age: number,
email: string,
phone: string,
kids: []
},
login:{
userid: string,
userpin: string,
pwd: string,
email: string
}
}

export type address = {
    id:string,
    street1: string,
    street2?: string,
    building: string
    city: string,
    state: string,
    zip: string
}

export type company = {
    id:string,
 name: string,
 _address:address,
}

export type contact = {
    id:string,
    _person:person,
    _address:address,
    _company:company,
    email:string,
    phone:string
}


type form_dto = {
    btnID: string,
    btnValue: string,
    formAction: string,
    formID: string
    formMethod: string,
    formData:object,
}
  
type fetch_opts = {
    title:"title",
    method:"GET" | "POST" | "PUT" | "DELETE",
    body: string |  Blob | FormData | ReadableStream | URLSearchParams | object,
   headers:{
    content_type: "application/json; charset=UTF-8",
   },
}

// Enums
export enum ToppingID {
    NewYorkStyle = 1,
    ChicagoStyle,
    ThinCrust,
    Bread,
    JerkSauce,
    MarinaraSauce,
    Sauce=7,
    Cheese,
    JackCheese,
    ProvaloneCheese,
    FettaCheese=11,
    GoodaCheese,
    CheddarCheese,
    Pepperoni=14,
    Bacon,
    Sausage,
    Onions=17,
    Peppers,
    Tomatoes,
    Olives=20,
    Avocado,
    Mushrooms,
    Egg,
    Orenego,
    Dill,
    Pineapples,
    Pinapples
  }
  
  export enum Toppings {
    NewYorkStyle = 1,
    ChicagoStyle,
    ThinCrust,
    Bread,
    JerkSauce,
    MarinaraSauce,
    Sauce=7,
    Cheese,
    JackCheese,
    ProvaloneCheese,
    FettaCheese=11,
    GoodaCheese,
    CheddarCheese,
    Pepperoni=14,
    Bacon,
    Sausage,
    Onions=17,
    Peppers,
    Tomatoes,
    Olives=20,
    Avocado,
    Mushrooms,
    Egg,
    Orenego,
    Dill,
    Pineapples,
    Pinapples,
  }
  export enum CrustType {
    Thin,
    Chicago,
    Sicilian,
    Tortilla,
    Vegan,
  }
  export enum CrustID {
    Thin,
    Chicago,
    Sicilian,
    Tortilla,
    Vegan,
  }

export type GroupItemType    = "Single" | "Multiple";
export type GroupToppingType = "Single" | "Multiple";

export type GroupTopping = {
  id: number;
  btype:GroupItemType;
  itype:"Multiple";
  items: ToppingID[];
  name: string;
  description: string;
  emoji: string;
}
export enum ToppingType {
  Bread,
  Meat,
  Vegan,
  Sauce,
  Cheese,
  PlantBased,
  Fruit,
  Seasoning,
  Crust
}
export type _Topping = {
  id: number;
  type:GroupItemType;
  itype:string;
  description: string;
  cost: number;
  emoji2: string;
  calories: number;
  category: ToppingType;
  usage: string;
  history: string;
}

export type topping = {
    id: number;
    itype:string;
    description: string;
    cost: number;
    emoji2: string;
    calories: number;
    category: ToppingType;
    usage: string;
    history: string;
}