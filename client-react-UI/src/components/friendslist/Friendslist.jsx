import "./friendslist.css"

export default function Friendslist({user}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
  return (
    <ul className="sidebarFriendList">
                <li className="sidebarFriend">
                    <img className="sidebarFriendImg" src={PF+user.profilePicture} alt=""/>
                    <span className="SidebarFriendName">{user.username}</span>
                </li>
            </ul>
  )
}
