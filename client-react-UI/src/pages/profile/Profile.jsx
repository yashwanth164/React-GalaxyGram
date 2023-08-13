import "./profile.css";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router";

export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
  const [user,setUser]=useState({});
  const username=useParams().username;

  useEffect(()=>{
        const fetchUser = async ()=>{
        try{
            const res= await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }catch(err){
            console.log(err);
    }
}
    fetchUser();
},[username]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src={user.coverPicture ? PF+user.coverPicture : PF+"profile-pics/defaultcover.jpg"}
                                alt=""
                                className="profileCoverImg"
                            />
                            <img
                                src={user.profilePicture ? PF+user.profilePicture : PF+"profile-pics/noavatar.jpg"}
                                alt=""
                                className="profileUserImg"
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>

                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    );
}
