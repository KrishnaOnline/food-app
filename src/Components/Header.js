import { useState } from 'react';
import { Link } from 'react-router-dom';

const Title = () => {
    return (
      <a href='./'>
      <img className='logo'
        src={require('../assets/images/app-logo.png')}
        alt='logo'
      />
      </a>
    )
  }
  
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
      <div className='header'>
        <Title/>
        <div className='nav-items'>
          <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
            <li>Cart</li>
          </ul>
        </div>
        {
          (isLoggedIn ? (<button className='login' onClick={() => setIsLoggedIn(false)}>Login</button>) : (<button className='logout' onClick={() => setIsLoggedIn(true)}>Logout</button>))
        }
        {/* <button className='login'>Login</button>
        <button className='logout'>Logout</button> */}
      </div>
    )
}

export default Header;