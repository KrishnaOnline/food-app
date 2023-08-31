import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    return (
        <div>
            <h1>Cart Items: {cartItems.length}</h1>
            {/* <FoodCard {...cartItems[0]}/> */}
        </div>
    )
}

export default Cart;