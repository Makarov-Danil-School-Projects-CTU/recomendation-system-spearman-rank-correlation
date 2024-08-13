import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import s from './Header.module.css'
import classnames from 'classnames'
import { logout } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { FiLogOut } from 'react-icons/fi'

const navigation = [
  { icon: <AiOutlineHome size={30} alt='Home' />, link: '/films' },
  { icon: <CgProfile size={30} alt='Profile' />, link: '/profile' },
]

const Header = () => {
  const dispatch = useDispatch()
  const path = '/' + useLocation().pathname.split('/')[1]

  const checkActiveLink = (link) => {
    if (link === path) {
      return true
    }

    return false
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const renderedLinks = navigation.map((nav, index) => {
    const className = classnames(s.iconLink, checkActiveLink(nav.link) && s.activeLink)

    return (
      <div key={index} className={className}>
        <Link to={nav.link}>{nav.icon}</Link>
      </div>
    )
  })
  renderedLinks.push()

  return (
    <div className={s.Header}>
      <div className={s.headerContainer}>
        <div className={s.iconColumn}>
          {renderedLinks}
          <div className={s.iconLink}>
            <FiLogOut size={30} alt='Logout' onClick={handleLogout} />
          </div>
        </div>
        <div className={s.actionColumn}></div>
      </div>
    </div>
  )
}

export default Header
