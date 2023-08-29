import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";


const RestaurantMenu = () => {
    const {resID} = useParams();

    const [restaurants, menu] = useRestaurantMenu(resID);

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
            </div>
            <div>
                <h1>Menu</h1>
                <ul>
                    {   
                        (console.log(menu),
                        Object.values(menu)?.map((i) => {
                            return (<li key={i?.card?.info?.id}>{i?.card?.info?.name}</li>)
                        }))
                    }
                </ul>
            </div>
        </div>
    )
}

export default RestaurantMenu;