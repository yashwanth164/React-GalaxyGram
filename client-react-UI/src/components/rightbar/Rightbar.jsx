import Online from "../online/Online"
import "./rightbar.css"
import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";


export default function Rightbar({user}) {
  // console.clear()
  // console.log(user)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER; 
  const [friends,setFriends]=useState([]);
  const {user:currentUser, dispatch}=useContext(AuthContext);
  const [followed, setFollowed]=useState(currentUser.following.includes(user?._id));

  useEffect(()=>{
    setFollowed(currentUser.following.includes(user?._id));
  },[currentUser,user])


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const followHandler= async ()=>{
    try{
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id});
        dispatch({type:"FOLLOW",payload:user._id})
      }
    }catch(err){
      console.log(err);
    }
    setFollowed(!followed);
  }

  const HomeRightbar= ()=>{
    return(
      <>
    <div className="birthdayContainer">
            <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
            <span className="birthdayText">
              <b>Rohit</b> and <b>3 other friends</b> have their birthday today.
            </span>
          </div>
          <img src="assets/business-ads.jpg" alt="" className="rightbarAd" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {Users.map((u)=>(
              <Online key={u.id} user={u} />
            ))}
          </ul>
    </>
    );
  };

  const ProfileRightbar=()=>{
    return(
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={followHandler}>
          {followed ? "Unfollow": "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
      <h1 className="rightbarTitle">User Information</h1>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-" }</span>
        </div>
      </div>
      <h1 className="rightbarTitle">User Friends</h1>
        <div className="rightbarFollowings">
          {friends.map((friend)=>{ return (
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"profile-pics/noavatar.jpg"} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
          </Link>)
          })}
        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
          {user? <ProfileRightbar/>:<HomeRightbar/>}
        </div>
    </div>
  );
}
