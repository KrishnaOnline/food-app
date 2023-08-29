import { useEffect, useState } from "react";

const useRestaurants = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    // console.log(searchText);

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.0072341&lng=79.55839209999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        // console.log(json);

        async function checkJsonData(jsonData){
          for(let i=0;i<jsonData?.data?.cards.length;i++){
            let checkData = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            if(checkData!==undefined){
              return checkData;
            }
          }
        }

        const resData=await checkJsonData(json);

        setAllRestaurants(resData);
        setFilteredRestaurants(resData);
    }

    return [allRestaurants, filteredRestaurants, searchText, setAllRestaurants, setFilteredRestaurants, setSearchText];
}

export default useRestaurants;