import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
// import About from './Components/About';
import Error from './Components/Error';
// import { IMG_CDN_URL } from './constants';
import { restaurantList } from './constants';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import Contact from './Components/Contact';
import RestaurantMenu from './Components/RestaurantMenu';
import Profile from './Components/Profile';
import { Suspense, lazy } from 'react';
import Shimmer from './Components/Shimmer';

const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));

const App = () => {
  return (
    <>
        <Header/>
        {/* <About/>
        <Body/>
        <Contact/> */}
        <Outlet/>
        <Footer/>
    </>
  )
}


const FoodApp = () => {
  return (
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <Suspense fallback={<Shimmer/>}>
                      <About />
                  </Suspense>,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ]
      },
      {
        path: "/contact",
        element: <Suspense fallback={<Shimmer/>}>
                    <Contact/>
                 </Suspense>
      },
      {
        path: "/restaurants/:resID",
        element: <RestaurantMenu/>
      }
    ],
  },
  {
    path: "/about",
    element: <About />,
  }
]);


export default FoodApp;
