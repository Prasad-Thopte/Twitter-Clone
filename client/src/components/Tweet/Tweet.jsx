import React from "react";
import ThreeDotsIcon from "../../icons/ThreeDotsIcon";
import CommentIcon from "./../../icons/CommentIcon";
import RetweetIcon from "./../../icons/RetweetIcon";
import ShareIcon from "./../../icons/ShareIcon";
import TextButton from "./../Button/TextButton/TextButton";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";
import classNames from "classnames";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import moment from "moment";
import { likeTweet, unlikeTweet } from "../../store/guest/guestActions";
import { useDispatch } from "react-redux";


const options = {
  className: () => "default-link",
  formatHref: {
    hashtag: (href) => "https://twitter.com/hashtag/" + href.substr(1),
    mention: (href) => "/" + href.substr(1),
  },
  format: {
    url: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
    hashtag: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
    mention: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
  },
  target: {
    url: "__blank",
    email: null,
  },
};

export default function Tweet({tweet}) {
  const dispatch = useDispatch()
  const {
    ref: tweetOptionsRef,
    isVisible: istweetOptions,
    setIsVisible: settweetOptions,
  } = useComponentVisible(false);
  const {
    ref: retweetRef,
    isVisible: reweetOptonsVisible,
    setIsVisible: setRewteetComponentVisible,
  } = useComponentVisible(false);
  const {
    ref: saveOptionsRef,
    isVisible: saveOptonsVisible,
    setIsVisible: setsaveOptionsComponentVisible,
  } = useComponentVisible(false);
  const showRetweetOptions = () => {
    setRewteetComponentVisible(true);
  };
  const showTweetOptions = () => {
    settweetOptions(true);
  };
  const showSaveTweetOptions = () => {
    setsaveOptionsComponentVisible(true);
  };
  const retweetOptionsClassnames = classNames("retweet-options", {
    show: reweetOptonsVisible,
  });
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const savetweetOptionsClassnames = classNames(
    "tweet-options-model",
    "save-options",
    {
      show: saveOptonsVisible,
    }
  );

  const handelTweetLike = ()=>{
    if(!tweet.isLiked)dispatch(likeTweet(tweet._id))
    else{
      dispatch(unlikeTweet(tweet._id))
    }
  }
  return (
    <div className="tweet tweet-container">
      <div className="profile-pic-container">
        <img src={tweet.user.avatar} alt="user-pic" className="profile-pic" />
      </div>
      <div className="tweet-content">
        <div className="tweet-content-header">
          <span className="tweet-content-child user-full-name">
            {tweet.user.fullName}
          </span>
          <span className="tweet-content-child user-username">@{tweet.user.username}</span>
          <span className="tweet-content-child useless-dot"></span>
          <span className="tweet-content-child timestamp">{moment(tweet.createdAt).fromNow()}</span>
          <div className="tweet-options-container" ref={tweetOptionsRef}>
            <span
              className="tweet-content-child tweet-options"
              onClick={showTweetOptions}
            >
              <ThreeDotsIcon className="tweet-options-icon" />
            </span>
            <ul className={tweetOptionsClassnames}>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon">
                  <i className="far fa-frown"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Not insterested in this tweet
                </TextButton>
              </li>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon">
                  <i className="far fa-user-plus"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Follow @Prasadbro
                </TextButton>
              </li>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon">
                  <i className="far fa-ban"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Block @Prasadbro
                </TextButton>
              </li>
              <li className="tweet-options-model-item">
                <span className="tweet-options-model-icon icon-4">
                  <i className="far fa-flag"></i>
                </span>
                <TextButton className="tweet-options-model-btn">
                  Report Tweet
                </TextButton>
              </li>
            </ul>
          </div>
        </div>
        <div className="tweet-content-text">
          <p className="tweet-text">
          {<Linkify options={options}>{tweet.caption}</Linkify>}
          </p>
        </div>
        <div className="tweet-content-image-container">
          {tweet.pic &&<img
            src={tweet.pic}
            alt="tweet-pic"
            className="tweet-content-image"
          />}
        </div>
        <div className="tweet-actions">
          <div className=" tweet-actions-child tweet-comment">
            <div className="tweet-icon">
              <CommentIcon fill={"#536471"} height="18px" width="18px" />
            </div>

            <span className="tweet-comment-count">4k</span>
          </div>
          <div className="tweet-actions-child tweet-retweet" ref={retweetRef}>
            <div className="tweet-icon" onClick={showRetweetOptions}>
            <i className="far fa-arrows-retweet"></i>
            </div>
            <div className={retweetOptionsClassnames}>
              <div className="retweet-options-child retweet-btn-container">
                <RetweetIcon fill={"#536471"} height="25px" width="25px" />
                <TextButton className="retweet-btn">Retweet</TextButton>
              </div>
              <div className="retweet-options-child quote-tweet-container">
                <i className="fas fa-pencil-alt"></i>
                <TextButton className="quote-btn">Quote tweet</TextButton>
              </div>
            </div>

            <span className="tweet-comment-count">9.7k</span>
          </div>
          <div className="tweet-actions-child like-tweet">
            <div className="tweet-icon like-icon" onClick={handelTweetLike}>
              <i className={tweet.isLiked?"fas fa-heart liked":"far fa-heart"}></i>
              {/* <LikeIcon fill={"#536471"} height="18px" width="18px"/> */}
            </div>

            <span className="tweet-comment-count">5.7k</span>
          </div>
          <div className="tweet-actions-child save-tweet-options">
            <div
              className="tweet-icon tweet-options-container"
              ref={saveOptionsRef}
            >
              <ShareIcon
                fill={"#536471"}
                height="18px"
                width="18px"
                onClick={showSaveTweetOptions}
              />
              <ul className={savetweetOptionsClassnames}>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                    <i className="far fa-bookmark"></i>
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Bookmark
                  </TextButton>
                </li>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                    <i className="far fa-link"></i>
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Copy link to tweet
                  </TextButton>
                </li>
                <li className="tweet-options-model-item">
                  <span className="tweet-options-model-icon">
                    <i className="far fa-share"></i>
                  </span>
                  <TextButton className="tweet-options-model-btn">
                    Sharet tweet via
                  </TextButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
