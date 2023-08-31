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
import { Suspense, lazy, useState } from 'react';
import Shimmer from './Components/Shimmer';
import Instamart from './Components/Instamart';
import UserContext from './utils/UserContext';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import store from './utils/store';
import Cart from './Components/Cart';


const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));

const App = () => {
  const [user, setUser] = useState({
    name: "Warangal",
    email: "wgl.restau@mail.com"
  });

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={{user: user}}>
          <Header/>
          {/* <About/>
          <Body/>
          <Contact/> */}
          <Outlet/>
          <Footer/>
        </UserContext.Provider>
      </Provider>
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
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Suspense fallback={<Shimmer/>}>
                    <Contact/>
                 </Suspense>
      },
      {
        path: "/instamart",
        element: <Instamart/>
      },
      {
        path: "/restaurants/:resID",
        element: <RestaurantMenu/>
      }
    ],
  },
]);


export default FoodApp;
