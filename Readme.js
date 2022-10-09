//https://www.w3schools.com/react/react_useeffect.asp
// 1.0) npx create-react-app "name"

// 1.1) Se llama JSX, y es una extensión de la sintaxis de JavaScript. JSX stands for JavaScript XML. JSX allows us 
//to write HTML in React. JSX makes it easier to write and add HTML in React.

// 1.2) Prop drilling: porque los props van pasando por todas los componentes (capas) de nuestra aplicación, 
//genera componentes muy "acoplados", jerarquía muy rígida

// 1.3) Linting: herramientas de análisis estático errores de sintaxis, Código poco intuitivo o dificil de mantener, 
//Uso de "malas practicas", O uso de estlios de codigo inconsistentes.

// 1.4) ESLint: ESLint es la herramienta predominante para la tarea de "limpiar" código javascript tanto en el 
//servidor (node.js) como en el navegador.

// 1.5) Patrones de render: son las props, prop children, High Order Components

// 1.6) ECMAScript was created to standardize JavaScript, and ES6 is the 6th version of ECMAScript, 
//it was published in 2015, and is also known as ECMAScript 2015.

// 1.7) Commont Libraries: 
      //1.7.1) *React Query: Toss out that granular state management, manual refetching and endless bowls of async-spaghetti code.
      //1.7.2) *Redux Toolkit: A global state to update data frecuently, 
        //create project and install redux -> npx create-react-app my-app --template redux
        //create project and instal redux, typescript -> npx create-react-app my-app --template redux-typescript
        //npm install @reduxjs/toolkit --save
      //1.7.3) *Formik: To build component forms, validations and inputs -> npm install formik --save
      //1.7.4) axios:  Promise based HTTP client for the browser and node.js -> npm install axios --save



//----------------------------------------------------------------
// 2) Metodo correcto actualizar 
// 2.1) this.setState((state, props) => ({ counter: state.counter + props.increment })); 
// 2.2) this.setState(function(state, props) { return { counter: state.counter + props.increment }; });
// 2.3) La función setState se usa para actualizar el estado. Acepta un nuevo valor de estado y sitúa en 
//la cola una nueva renderización del componente.

import { Fragment, useState } from "react"
const ExampleUpdate = props =>{
  const [value, setValue] = useState({counter: 0, state: true});

  const updateHandler = () =>{
    setValue((snapshot, props)=>{
      return {...snapshot, counter: snapshot.counter + props.increment}
    })
  }

  return (<Fragment>
    {value}
    <button onClick={updateHandler}></button>
  </Fragment>)
}




//----------------------------------------------------------------
//3) Add Any component in a node DOM html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ExampleUpdate />);




//----------------------------------------------------------------
// 4) Pasar parametros extras
// 4.1) <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// 4.2) <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

const exampleButtons = (props) =>{

  const [value, setValue] = useState(0);

  const changeHandler = (e, increment) =>{
    setValue((snapshot) =>{
      return snapshot.value + increment;
    });  
  }

  return (<Fragment>
    {value}
    <button onClick={(e) =>{changeHandler(e, props.incremet)}}></button>
  </Fragment>)

}



//----------------------------------------------------------------
// 5) Portals: Portals are a way to render React children outside the main DOM hierarchy of the parent component 
//without losing the react context
// 5.1) Create a new node in index.html
// 5.1) Use ReactDOM createportar and insert the component and the container

const portalContainer = document.getElementById('another-root');
class HelloReact extends React.Component {
  render() {
      return (
           <div>
               <h1>Hello World</h1>
               { ReactDOM.createPortal(<HelloFromPortal />, portalContainer) }
           </div>
      );
  }
}



//----------------------------------------------------------------
// 6) Side Effect: Side effects are basically anything that affects something outside of the scope of 
//the current function that’s being executed.
// 6.1) useEffect será para suscribirnos a eventos del DOM 
//useEffect(() => {const updateWidth = () => {...}; updateWidth(); window.addEventListener("resize", updateWidth)})
// 6.2) Clear the suscription with 
//return useEffect(() => { ..."CODE"; window.addEventListener("resize", updateWidth); return () => { window.removeEventListener("resize", updateWidth) } })
// 6.3) [] ejecutar al montarse y desmontarse nuestro componente. (componentDidMount, componentWillUnmount)
// 6.4) no hay nada quiere decir que sólo se ejecuta una vez (al principio)
// 6.5) Llenar el [...] con data, para evitar caer en un loop infinito, cuando usas un useState
// 6) UseState: const [name, setName] = useState('John');


const GetNameFormat = (name) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue((snapshot)=>{
      return name + Math.floor(Math.random() * 10);
    })

    return ()=>{}
  },[name]);

  return value;

}



//----------------------------------------------------------------
// 7) useReducer Cuando tienes una lógica de estado compleja, es una buena idea usar un “reductor”.
// 7.1) Default values: const initialTodos = [...];
// 7.2) Create function reducer:  
// 7.3) Initialization: const [todos, dispatch] = useReducer(reducer, initialTodos);
// 7.4) Call reducer dispatch({ type: "COMPLETE", id: todo.id });

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const initialState = [];

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}



//----------------------------------------------------------------
// 8) Context provee una forma de pasar datos a través del árbol de componentes 
//sin tener que pasar props manualmente en cada nivel.
// 8.1) Create Context
// 8.2) Create useState o useReducer 
// 8.3) Create functions  
// 8.4) Create Provider  
// 8.5) Edit the main node add: import ProductsProvider from './context/products-context';
// 8.6) Edit the main node to use provider globally: <ProductsProvider><BrowserRouter><App /></BrowserRouter></ProductsProvider>

export const ProductsContext = React.createContext({ products: [], toggleFav: (id) => {} });

export const ProviderProducts = () =>{
  const [productsList, setProductsList] = useState([]);
  const toggleFavorite = productId => {};

  return (<ProductsContext.Provider value={{ products: productsList, toggleFav: toggleFavorite }}> 
      {props.children}
    </ProductsContext.Provider>);
}



//----------------------------------------------------------------
// 9) useContext
// 9.1) import the provider
// 9.2) uso el providerList con useContext
// 9.3) Use array from productList to render

import { ProductsContext } from '../context/products-context';
export const Product = () =>{
  const productList = useContext(ProductsContext).products;
  let li = productList.map( x => <li>x.name</li>)
  return <ul>{li}</ul>;
}



//----------------------------------------------------------------
// 10) Dispatch Context
// 10.1) Get the event from the context: 
// 10.2) Create a function handler to call function contect:  
// 10.2) Use the event in the component to call function context: 

import { ProductsContext } from '../context/products-context';
export const ProductDispatcher = () =>{
  const toggleFav = useContext(ProductsContext).toggleFav;
  const toggleFavHandler = () => { toggleFav(props.id); };
  return (<div onClick={toggleFavHandler}>click</div>)
}


//----------------------------------------------------------------
// 11) useRef: devuelve un objeto ref mutable cuya propiedad .current 
//se inicializa con el argumento pasado (initialValue)
// 11.1) The useRef Hook allows you to persist values between renders.
// 11.2) It can be used to access a DOM element directly.
// 11.3) useRef() only returns one item. It returns an Object called current.

import { useRef } from "react";

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => { inputEl.current.focus(); };
  
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}



//----------------------------------------------------------------
// 12) useCallBack:  devolverá una versión memorizada del callback que solo cambia 
//si una de las dependencias ha cambiado, "nos memoriza la función"
// 12.1) example: const usernameInput = useCallback((changed) => {setUsername(changed) }, [username])
// 12.2) example: const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);
// 12.3) use in events: <Input config={username} onInput={usernameInput} ></Input>


//----------------------------------------------------------------
// 13) useMemo: useMemo solo volverá a calcular el valor memorizado cuando una de las dependencias 
//haya cambiado, "nos memoriza la función y el argumento"
// 13.2) const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);


//----------------------------------------------------------------
// 14) Custom Hook: When you have component logic that needs to be used by multiple components, 
//we can extract that logic to a custom Hook.
// 14.1) Custom Hooks start with "use"
// 14.2) Is a normal function arrow, but we can use hook and implement logic
// 14.3) We need to return and array with dependencies

import { useState, useEffect } from "react";
const useFetch = (url) => {
      const [data, setData] = useState(null);
      useEffect(() => {
          fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data))
          .catch((err) => console.log(err));
      }, [url]);
      return [data];
};


import useFetch from "./useFetch";
const YourComponent = () => {
   const [products] = useFetch("https://example.com/products");
   return (
       <div>{products && products.map((prod) => {
               return <ul><li key={prod.id}>{prod.title}</li></ul>;
            })}
       </div>
   );
};




//----------------------------------------------------------------
//15) Routing
//15.1) Create React App doesn't include page routing. React Router is the most popular solution. 
//15.2) to install npm i -D react-router-dom
//15.3) We wrap our content first with <BrowserRouter>.
//15.4) Then we define our <Routes>. An application can have multiple <Routes>. Our basic example only uses one.
//15.5) Setting the path to * will act as a catch-all for any undefined URLs. This is great for a 404 error page.

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


//----------------------------------------------------------------
//16) Pages / Components
//16.1) The <Outlet> renders the current route selected.
//16.2) <Link> is used to set the URL and keep track of browsing history.

import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};


//----------------------------------------------------------------
//17) React Events
//17.1) React events are written in camelCase syntax: onClick instead of onclick.
//17.2) React event handlers are written inside curly braces: onClick={shoot}  instead of onClick="shoot()".

function Football() {
  const shoot = (a) => { alert(a); }

  return ( <button onClick={() => shoot("Goal!")}>Take the shot!</button>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football />);



//----------------------------------------------------------------
//18) Create a Class Component
//1)  must start with an upper case letter.
//2) has to include the extends React.Component statement, this statement creates an inheritance to
// React.Component, and gives your component access to React.Component's functions.
//3) The component also requires a render() method, this method returns HTML.
//4) The constructor function is where you initiate the component's properties, including the super() statement
//5) if your component has a constructor function, the props should always be passed to the constructor 
//and also to the React.Component via the super() method.

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: "Ford",model: "Mustang", color: "red", year: 1964};
  }
  changeColor = () => { this.setState({color: "blue"}); }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color} {this.state.model} from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}


//----------------------------------------------------------------
//19) Creating A component Class
//1) React has four built-in methods that gets called, in this order, when mounting a component: 
//2) constructor(): method is called before anything else, when the component is initiated
//3) getDerivedStateFromProps(): method is called right before rendering the element(s) in the DOM.
//It takes state as an argument, and returns an object with changes to the state.
//4) render(): "required", is the method that actually outputs the HTML to the DOM
//5) componentDidMount():   method is called after the component is rendered

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }

  componentDidMount() {
    setTimeout(() => { this.setState({favoritecolor: "yellow"}) }, 1000)
  }

  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Header favcol="yellow"/>);


//----------------------------------------------------------------
//20) Updating A component Class
//A component is updated whenever there is a change in the component's state or props.
//1) getDerivedStateFromProps(): This is the first method that is called when a component gets updated.
//This is still the natural place to set the state object based on the initial props.
//2) shouldComponentUpdate(): method you can return a Boolean value that specifies 
//whether React should continue with the rendering or not
//3) render(): required,  it has to re-render the HTML to the DOM
//4) getSnapshotBeforeUpdate(): method you have access to the props and state before the update
//if method is present, you should also include the componentDidUpdate()
//5) componentDidUpdate(): method is called after the component is updated in the DOM

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML = "Before the update, the favorite was " + prevState.favoritecolor;
  }

  componentDidMount() {
    setTimeout(() => { this.setState({favoritecolor: "yellow"})}, 1000)
  }

  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}


//----------------------------------------------------------------
//21) Unmounting A component Class
//1)The componentWillUnmount method is called when the component is about to be removed from the DOM.

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}