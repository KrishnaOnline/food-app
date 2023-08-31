import { IMG_CDN_URL } from "../constants";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";


const RestaurantCard = (props) => {
  const {name, cuisines, cloudinaryImageId, areaName, avgRatingString, id} = props.resData.info;
  // const name = props?.resData?.info?.name;
  // const cuisines = props?.resData?.info?.cuisines.join(", ");
  // const cloudinaryImageId = props?.resData.info?.cloudinaryImageId;
  // const areaName = props?.resData.info?.areaName;
  // const avgRatingString = props?.resData.info?.avgRatingString;

  const {user} = useContext(UserContext);

    return (
      <Link to={"/restaurants/"+id} style={{textDecoration: "none", color: "black"}}>
        <div className='card'>
          <img alt="" src={
              IMG_CDN_URL+""+cloudinaryImageId
          }/>
          <h2>{name}</h2>
          <p>{cuisines.join(", ")}</p>
          <h3>{avgRatingString} ⭐</h3>
          <p>{areaName}, <span>{user.name}</span></p>
        </div>
      </Link>
    )
}

export default RestaurantCard;