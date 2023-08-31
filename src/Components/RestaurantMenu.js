import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import {useDispatch} from "react-redux";
import { addItem } from "../utils/cartSlice";


const RestaurantMenu = () => {
    const {resID} = useParams();

    const [restaurants, menu] = useRestaurantMenu(resID);

    const dispatch = useDispatch();

    // const handleAddItems = () => {
    //     dispatch(addItem("JK"))
    // }

    const addFoodItem = (item) => {
        dispatch(addItem(item));
    }

    if(!restaurants) {
        return <Shimmer/>
    }

    if(!menu) {
        return (<h1>Sorry! Menu of this Restaurant is NOT AVAILABLE at the Moment, Please Check Other Restaurants</h1>)
    }

    return (
        <div className="menu">
            <div>
                <h2>{restaurants?.name}</h2>
                <p><span style={{fontWeight: "600"}}>Restaurant ID:</span> {resID}</p>
                <img alt="" src={IMG_CDN_URL+restaurants?.cloudinaryImageId}/>
                <h3>{restaurants?.cuisines?.join(", ")}</h3>
                <p>{restaurants?.avgRating} ⭐</p>
                <p>{restaurants?.costForTwoMessage}</p>

                {/* <button onClick={() => handleAddItems()}>Add to Cart</button> */}
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                    {   
                        Object.values(menu)?.map((i) => {
                            return (
                                <div key={i?.card?.info?.id}>
                                    <li>{i?.card?.info?.name} -
                                        <button onClick={() => addFoodItem(i)}>Add</button>
                                    </li>
                                </div>    
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default RestaurantMenu;