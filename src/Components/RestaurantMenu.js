import { useParams } from "react-router-dom";
import { IMG_CDN_URL, FETCH_MENU_URL } from "../constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";


const RestaurantMenu = () => {
    const params = useParams();
    const {resID} = params;

    const [restaurants, setRestaurants] = useState(null);
    const [menu, setMenu] = useState([]);
    // console.log(params);
    // console.log(id);

    useEffect(() => {
        getRestaurantMenu();
    }, []);

    async function getRestaurantMenu() {
        const apiData = await fetch(FETCH_MENU_URL + resID);
        const json = await apiData.json();
        // console.log(json);
        // console.log(1939);

        function checkRestaurant(jsonData) {
            for(let i=0; i<jsonData?.data?.cards?.length; i++) {
                let checkData = jsonData?.data?.cards[i]?.card?.card?.info;
                if(checkData !== undefined) {
                    return checkData;
                }
            }
        }

        function checkMenu(jsonData) {
            for(let i=0; i<jsonData?.data?.cards?.length; i++) {
                let checkData = jsonData?.data?.cards[i]?.groupedCard;
                if(checkData !== undefined) {
                    return checkData;
                }
            }
        }
        // data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
        // cardGroupMap.REGULAR.cards[1].card.card.itemCards

        const apiDataRestau = await checkRestaurant(json);
        const apiDataMenu = await checkMenu(json);
        // console.log(apiDataRestau);
        console.log(apiDataMenu);
        setRestaurants(apiDataRestau);
        setMenu(apiDataMenu?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
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