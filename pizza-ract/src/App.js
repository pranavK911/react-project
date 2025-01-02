
import './App.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


function App() {
  return (
    <div className="container">
     <Header/>
     <Menu/>
     <Footer/>
    </div>
  );
}
function Header(){
  return<header className='header'>
    <h1 >Fast React Pizza Co.</h1>
  </header>
}
function Menu(){
  const pizzas=pizzaData;
  // const pizzas=[];
  const numofpizza=pizzas.length;
  return <main className='menu'>
    <h2>Our menu</h2>
    {numofpizza>0?(
      <>
      <p>An Italian restaurant is a delightful culinary destination that brings the rich, flavorful traditions of Italy to your table. Known for its warm ambiance and rustic charm, an Italian restaurant is a celebration of both food and culture</p>
      <ul className='pizzas'>
      {pizzas.map((data)=>{
       return <Pizza key={data.name} pizzaobj={data}/>
      })}
      </ul></>):
      <p>We're still working on our menu.Please come back later:)</p>}
   
  </main>
}
function Pizza({pizzaobj}){
  // console.log(pizzaobj);
  return (
  <div className={`pizza ${pizzaobj.soldOut?'sold-out':''}`} >
    <img src={pizzaobj.photoName} alt={pizzaobj.name}/>
    <li>
     <h3>{pizzaobj.name}</h3>
     <p>{pizzaobj.ingredients}</p>
     <span>{pizzaobj.soldOut?'SOLD OUT':pizzaobj.price}</span>
  </li>
  </div>
)}

function Footer(){
  const hour=new Date().getHours();
  console.log(hour);
  
  const openhour=9;
  const closehour=22;
  const isOpen=hour>=openhour && hour<closehour;
  console.log(isOpen);
  
  return <footer className='footer'>
    {isOpen ?( <Order closehour={closehour}/>):<p>We're happy to welcom you between {openhour}:00 and {closehour}:00 </p>}
  
  </footer>
}
function Order({closehour}){
  return(<div className='order'><p>We're open until {closehour}:00. Come visit us or order online</p>
    <button className='btn'>Order</button>
  </div>)
}
export default App;
