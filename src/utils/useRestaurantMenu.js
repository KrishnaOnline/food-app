import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../constants";

const useRestaurantMenu = (resID) => {
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
    return [restaurants, menu];
}

export default useRestaurantMenu;