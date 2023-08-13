import "./topbar.css"
import { SearchRounded, PersonRounded, ChatBubbleRounded, NotificationsRounded } from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Topbar() {
  const {user}= useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">GalaxyGram</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchRounded className="searchIcon"/>
            <input placeholder="Search for Content..." className="searchInput"/>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Home</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonRounded/>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ChatBubbleRounded/>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsRounded/>
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}> 
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pics/noavatar.jpg"} alt="" className="topbarImg" />
          </Link>
        </div>
    </div>
  )
}
