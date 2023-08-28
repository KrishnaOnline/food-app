import RestaurantCard from "./RestaurantCard";
import { restaurantList } from "../constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import RestaurantMenu from "./RestaurantMenu";
import { Link } from "react-router-dom";
import { filterData } from "../utils/utilities";

const Body = () => {
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
                    return (
                                {/* <Link key={restaurant?.info?.id} to={"/restaurants/"+restaurant?.info?.id} style={{textDecoration: "none", color: "black"}}>
                                    <RestaurantCard {...restaurant.data} resData={restaurant} />
                                </Link> */},

                                <RestaurantCard {...restaurant.data} resData={restaurant} key={restaurant?.info?.id}/>
                            )
            })}
        </div>
      </div>
    )
}

export default Body;