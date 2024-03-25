import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="nav-links">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="desktop-navs-container">
        <li>
          <Link to="/" className="nav-links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-links">
            Jobs
          </Link>
        </li>
      </ul>
      <button onClick={logoutUser} type="button" className="logout-button">
        Logout
      </button>
      <ul className="mobile-navs-container">
        <li>
          <Link to="/" className="nav-links">
            <AiFillHome className="nav-logos" />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-links">
            <FaSuitcase className="nav-logos" />
          </Link>
        </li>
        <li>
          <button
            onClick={logoutUser}
            type="button"
            className="mobile-logout-button"
          >
            <FiLogOut className="nav-logos" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
