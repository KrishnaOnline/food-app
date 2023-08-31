import { useState } from 'react';
import { Link } from 'react-router-dom';
import useIsOnline from '../utils/useIsOnline';
import { useSelector } from 'react-redux';

const Title = () => {
    return (
      <a href='/'>
      <img className='logo'
        src={require('../assets/images/app-logo.png')}
        alt='logo'
      />
      </a>
    )
  }
  
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isOnline = useIsOnline();

  const cartItems = useSelector(store => store.cart.items);
  console.log(cartItems);

    return (
      <div className='header'>
        <Title/>
        <div className='nav-items'>
          <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
            <Link to="/instamart"><li>Instamart</li></Link>
            <Link to="/cart"><li>Cart - {cartItems.length}</li></Link>
          </ul>
        </div>
        <h3>{isOnline ? '🟢 Online' : '🔴 Offline' }</h3>
        {
          (isLoggedIn ? (<button className='login' onClick={() => setIsLoggedIn(false)}>Login</button>) : (<button className='logout' onClick={() => setIsLoggedIn(true)}>Logout</button>))
        }
        {/* <button className='login'>Login</button>
        <button className='logout'>Logout</button> */}
      </div>
    )
}

export default Header;