import { Users } from "../../dummyData"
import Friendslist from "../friendslist/Friendslist"
import "./sidebar.css"
import { RssFeedRounded,ChatRounded,VideoLibraryRounded,GroupsRounded,BookmarkRounded,NotListedLocationRounded,Work,Event,School } from "@mui/icons-material"

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <RssFeedRounded className="sidebarIcon"/>
                    <span className="sidebarListItemText">Feed</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <ChatRounded className="sidebarIcon"/>
                    <span className="sidebarListItemText">Chats</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <VideoLibraryRounded className="sidebarIcon"/>
                    <span className="sidebarListItemText">Videos</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <GroupsRounded className="sidebarIcon"/>
                    <span className="sidebarListItemText">Groups</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <BookmarkRounded className="sidebarIcon"/>
                    <span className="sidebarListItemText">Bookmarks</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <NotListedLocationRounded className="sidebarIcon"/>
                    <span className="sidebarListItemText">Questions</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Work className="sidebarIcon"/>
                    <span className="sidebarListItemText">Jobs</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <Event className="sidebarIcon"/>
                    <span className="sidebarListItemText">Events</span>
                </li>
            </ul>
            <ul className="sidebarList">
                <li className="sidebarListItem">
                    <School className="sidebarIcon"/>
                    <span className="sidebarListItemText">Courses</span>
                </li>
            </ul>
            <button className="sidebarButton">Show More</button>
            <hr className="sidebarHr"/>
            {Users.map((u)=>(
                <Friendslist key={u.id} user={u}/>
            ))}
        </div>
    </div>
  )
}
