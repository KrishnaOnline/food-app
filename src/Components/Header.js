import { useState } from 'react';

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
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
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