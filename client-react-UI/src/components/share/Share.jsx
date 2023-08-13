import { useContext, useRef, useState } from "react"
import "./share.css"
import {PermMediaRounded, Label, Room, EmojiEmotions, Cancel} from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const desc=useRef();
    const [file, setFile]=useState(null);

    const submitHandler= async (e)=>{
        e.preventDeafult()
        const newpost={
            userId:user._id,
            desc:desc.current.value,
        }
        if(file){
            const data =new FormData();
            const filename=Date.now()+file.name;
            data.append("file",file);
            data.append("name",filename);
            newpost.img=filename;
            try{
                await axios.post("/upload",data);
            }catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post("/posts",newpost);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture  ? PF+user.profilePicture : PF + "profile-pics/noavatar.jpg"} alt=""/>
                <input placeholder={"What's in your mind "+user.username+"?"} type="text" ref={desc} className="shareInput"/>
            </div>
            <hr className="shareHr"/>
            {file &&    (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
                    <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMediaRounded htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="gray" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Emojis</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
