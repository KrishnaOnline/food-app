import { IMG_CDN_URL } from "../constants";
import { Link } from "react-router-dom";


const RestaurantCard = (props) => {
  const {name, cuisines, cloudinaryImageId, areaName, avgRatingString, id} = props.resData.info;
  // const name = props?.resData?.info?.name;
  // const cuisines = props?.resData?.info?.cuisines.join(", ");
  // const cloudinaryImageId = props?.resData.info?.cloudinaryImageId;
  // const areaName = props?.resData.info?.areaName;
  // const avgRatingString = props?.resData.info?.avgRatingString;

    return (
      <Link to={"/restaurants/"+id} style={{textDecoration: "none", color: "black"}}>
        <div className='card'>
          <img alt="" src={
              IMG_CDN_URL+""+cloudinaryImageId
          }/>
          <h2>{name}</h2>
          <p>{cuisines.join(", ")}</p>
          <h4>{areaName}</h4>
          <h3>{avgRatingString} ⭐</h3>
        </div>
      </Link>
    )
}

export default RestaurantCard;