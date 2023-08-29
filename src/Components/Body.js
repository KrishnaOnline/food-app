import RestaurantCard from "./RestaurantCard";
// import { restaurantList } from "../constants";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/utilities";
import useRestaurants from "../utils/useRestaurants";
import useIsOnline from "../utils/useIsOnline";

const Body = () => {
    const [allRestaurants, filteredRestaurants, searchText, setAllRestaurants, setFilteredRestaurants, setSearchText] = useRestaurants();

    let isOnline = useIsOnline();
    if(!isOnline)
        return (<h1>Looks Like You're Offline, Please Check Your Internet Connection</h1>)
    if(allRestaurants?.length === 0) 
        return (<Shimmer/>)

    return (
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