import { useContext } from "react";
import "./Cart.css";
import CartContext from "../Context/CartContext";
import { addDoc, collection, Timestamp, getDocs} from "firebase/firestore";
import { firestoreDb } from "../services/firebase/index";

const Cart = () => {

     const { cart, clearCart, removeItem, getTotal } = useContext(CartContext);

     const addDocToCollection = () => {
          const collectionRef = collection(firestoreDb, 'user')

          const obUser = {
               items: cart,
               name: "Lucas",
               lastname: "Fernandez",
               phone: '1138053409',
               email: "lucas.fernandez32zs@gmail.com",
               total: getTotal(),
               date: Timestamp.fromDate(new Date()),
          }

          addDoc(collectionRef, obUser).then(response => {
               alert("Compra realizada con exito ID: " + response.id)
          })
     }

     const GetOrderUser = () => {
          const collectionRef = collection(firestoreDb, 'user')

          getDocs(collectionRef).then(response => {
               const orderUser = response.docs.map(doc => {
                    return {id: doc.id, ...doc}
               })
                  alert("PEDIDOS " + orderUser.map(id => "\n Pedido ID: "  + id.id ))
          })
     }

     if (cart.length === 0) {
          return (
               <div className="Cart">
                    <h2>No hay productos en el Carrito</h2>
               </div>
          )
     }

     return (
          <>
               <p className="titleCar">Carrito de Compras</p>
               <div className="container container_Card">
                    {cart.map(prod => <div className="d-flex justify-content-between col-2 card my-2" key={prod.id} {...prod}>
                         <img src={prod.thumbnail} className="card-img-top" alt={prod.title} />
                         <div className="card-body">
                              <h5 className="card-title">Titulo: {prod.title}</h5>
                         </div>
                         <ul className="list-group list-group-flush">
                              <li className="list-group-item">Cantidad: {prod.quantity}</li>
                              <li className="list-group-item">Subtotal: ${prod.quantity * prod.price}</li>
                         </ul>
                         <button type="button" className="btn_Container" onClick={() => removeItem(prod.id)}>Eliminar</button>
                    </div>)}
               </div>
               <div className="d-flexs py-3 container text-center">
                    <div className="card my-2 fs-3">
                         Costo total de compra: {cart.reduce((totalCar, curr) => totalCar + curr.quantity * curr.price, 0)}
                    </div>
                    <div className="py-3">
                         <button type="button" className="btn btn-primary" onClick={() => addDocToCollection([])}>Generar Orden</button>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => clearCart()}>Vaciar Carrito</button>
                    <button type="button" className="m-1 btn btn-success" >Cargar Datos del Datos</button>
                    <button type="button" className="btn btn-danger" onClick={() => GetOrderUser()}>Ver ID Pedido</button>
               </div>
          </>
     );
}

export default Cart;