import RestaurantCard from "./RestaurantCard";
import { restaurantList } from "../constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import RestaurantMenu from "./RestaurantMenu";


function filterData(searchText, restaurants) {
    return restaurants.filter((restau) => {
        return restau?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase());
    });
}

const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");
    // console.log(searchText);

    

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.425938120298223&lng=78.39342287825744&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
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


    // if(filteredRestaurants?.length === 0)
    //     return <h1>No Restaurants Found with {searchText}</h1>

    // if(!allRestaurants) return null;


    return (allRestaurants?.length === 0) ? (<Shimmer/>) :
    (
      <div>
        <div className="search-container">
            <input type="text" className="search-input" placeholder="Search" value={searchText} 
            onChange={(e) => {
                setSearchText(e.target.value);
            }}/>
            <button className="search-btn" onClick={
                () => {
                    const data = filterData(searchText, allRestaurants);
                    setFilteredRestaurants(data);
                }
            }>Search</button>
        </div>
        <div className='restaurant-list'>
            {
                filteredRestaurants?.map((restaurant) => {           //filteredRestau with NO FILTERS is allRestau ONLY, RIGHT ...
                    return <RestaurantCard {...restaurant.data} key={restaurant?.info?.id} resData={restaurant} />
            })}
        </div>
      </div>
    )
}

export default Body;