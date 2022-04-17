import React, { useState } from "react";
import MediaIcon from "../../icons/MediaIcon";
import TextButton from "../Button/TextButton/TextButton";
import GifIcon from "./../../icons/GifIcon";
import PollIcon from "./../../icons/PollIcon";
import EmojiIcon from "./../../icons/EmojiIcon";
import ScheduleIcon from "./../../icons/ScheduleIcon";
import LocationIcon from "./../../icons/LocationIcon";
import classNames from "classnames";
import Picker from "emoji-picker-react";
import { useSelector,useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/userSelector";
import { postTheTweet } from "../../services/tweetService";
import { POSTING_TWEET_FAILED, POSTING_TWEET_FINISED, POSTING_TWEET_STARTED } from "../../store/user/userSlice";

export default function SendTweet({ className,placeholder,type,tweet=null }) {
  const dispatch = useDispatch()
  const state = useSelector((state) => state);
  const postingTweet = useSelector(state=>state.user.isPostingTweet)
  const currentUser = selectCurrentUser(state);
  const [tweetText,setTweetText] = useState('');
  const [showEmojiBox, setShowEmojiBox] = useState(false);
  const [tweetPic, setTweetPic] = useState(null);
  const sendTweetClassnames = classNames("send-tweet", className);
  function auto_grow(element) {
    element.target.style.height = "48px";
    element.target.style.height = element.target.scrollHeight + "px";
  }
  const handelTweetPicChange = (e) => {
    try {
      const [file] = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTweetPic(reader.result);
      };
    } catch (error) {
      alert(error.message);
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    setTweetText(prevState=>prevState+=emojiObject.emoji)
  };
  const handelSubmit = async()=>{
    // if(type==='tweetReply')dispatch(postTweetReply(tweetText,tweetPic,tweet._id))
    // dispatch(postTweet(tweetText,tweetPic,tweet))
    try {
      // if(!caption) dispatch error
      if(!tweetText){
         return dispatch(POSTING_TWEET_FAILED('No caption provided'))
      }
      dispatch(POSTING_TWEET_STARTED())
      if(!tweet)await postTheTweet(tweetText, tweetPic,null);
      else{
          await postTheTweet(tweetText, tweetPic,tweet._id);
      }
      
      // dispatch success
      dispatch(POSTING_TWEET_FINISED())
      setTweetPic(null);
      setTweetText('');
  } catch (error) {
      dispatch(POSTING_TWEET_FAILED(error.message))
  }
  }

  return (
    <section className={sendTweetClassnames}>
      <div className={postingTweet ?"send-tweet-wrap disabled" :"send-tweet-wrap"} >
        <div className="wrapper">
          <div className="profile-pic-container">
            <img src={currentUser.avatar} alt="userpic" className="user-pic" />
          </div>
          <div className="whats-happening">
            <div className="tweet-input-container">
              <textarea
                onInput={(e) => auto_grow(e)}
                type="text"
                name="tweet-text"
                placeholder={placeholder ||"What's happening?"}
                className="tweet-input"
                maxLength={300}
                value={tweetText}
                onChange={(e)=>setTweetText(e.target.value)}
              />
            </div>
            <div className="tweet-pic">
              {tweetPic && (
                <span className="close-btn" onClick={() => setTweetPic(null)}>
                  <i className="fas fa-xmark"></i>
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                alt="tweet pic"
                id="tweetPic"
                name="tweetPic"
                hidden
                multiple={false}
                onChange={handelTweetPicChange}
              ></input>
              {tweetPic && (
                <img
                  src={tweetPic}
                  alt="tweet-attachment"
                  className="tweet-attachment-pic"
                />
              )}
            </div>
            <div className="tweet-attachment">
              <div className="icon-containers">
                {showEmojiBox && (
                  <div className="icon-picker-wrap">
                    <Picker onEmojiClick={onEmojiClick} preload={true}/>
                  </div>
                )}
                <div
                  className={
                    tweetPic ? "icon-container icon-disabled" : "icon-container"
                  }
                >
                  <MediaIcon
                    color={tweetPic ? "red" : null}
                    className={tweetPic && "disabled-icon"}
                    onClick={() => document.getElementById("tweetPic").click()}
                  />
                </div>
                <div className="icon-container icon-disabled">
                  <GifIcon className="disabled-icon" />
                </div>
                <div className="icon-container icon-disabled">
                  <PollIcon className="disabled-icon" />
                </div>
                <div className="icon-container">
                  <EmojiIcon
                    onClick={() => setShowEmojiBox((state) => !state)}
                  />
                </div>
                <div className="icon-container icon-disabled">
                  <ScheduleIcon className="disabled-icon" />
                </div>
                <div className="icon-container icon-disabled">
                  <LocationIcon className="disabled-icon" />
                </div>
              </div>
              <div className="send-tweet-btn-container">
                <TextButton bcBlue rounded className="send-tweet-btn" disabled={!tweetText} onClick={handelSubmit}>
                  Tweet
                </TextButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
