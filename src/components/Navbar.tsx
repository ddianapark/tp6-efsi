import Logo from './icons/Logo';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import ExploreIcon from './icons/ExploreIcon';
import ReelsIcon from './icons/ReelsIcon';
import MessagesIcon from './icons/MessagesIcon';
import NotificationsIcon from './icons/NotificationsIcon';
import CreateIcon from './icons/CreateIcon';
import MoreIcon from './icons/MoreIcon';

export default function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <Logo />
            <li className="nav-item">
              <HomeIcon />
              <a className="nav-link active" aria-current="page">Home</a>
            </li>
            <li className="nav-item">
              <SearchIcon />
              <a className="nav-link">Search</a>
            </li>
            <li className="nav-item">
              <ExploreIcon />
              <a className="nav-link">Explore</a>
            </li>
            <li className="nav-item">
              <ReelsIcon />
              <a className="nav-link">Reels</a>
            </li>
            <li className="nav-item">
              <MessagesIcon />
              <a className="nav-link">Messages</a>
            </li>
            <li className="nav-item">
              <NotificationsIcon />
              <a className="nav-link">Notifications</a>
            </li>
            <li className="nav-item">
              <CreateIcon />
              <a className="nav-link">Create</a>
            </li>
            <li className="nav-item">
              <img className="perfil-img" src="/src/img/manon.jpg" alt="Manon Profile" />
              <a className="nav-link">Profile</a>
            </li>
            <li className="nav-item">
              <MoreIcon />
              <a className="nav-link">More</a>
            </li>
          </ul>
        </div>
      </nav>
  )
}