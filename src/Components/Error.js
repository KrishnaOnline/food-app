import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    // console.log(err);

    return (
        <div>
            <h2>{err.data}</h2>
            <h3>{err.status+": "+err.statusText}</h3>
            <h1>OoooPS !!!</h1>
            <h2>Something Went Wrong</h2>
        </div>
    )
}

export default Error;