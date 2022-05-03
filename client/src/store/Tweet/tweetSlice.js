import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching:true,
    tweet:null,
    fetchingTweetError:null,

}


export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        FETCHING_TWEET_SUCCESS: (state,action) => {
            state.tweet = action.payload
            state.fetching = false;
        },
        FETCHING_TWEET_FAILED: (state,action) => {
            state.fetchingTweetError = action.payload
            state.fetching = false;
        },
        FETCHING_TWEET_STARTED:(state)=>{
            state.fetching = true;
        },
        TWEET_LIKED_SUCCESS:(state)=>{
            state.tweet.isLiked = true;
            state.tweet.likesCount+=1;
        },
        TWEET_LIKED_FAILED:(state)=>{
            state.tweet.isLiked = false;
            state.tweet.likesCount-=1;
        },
        TWEET_UNLIKED_SUCCESS:(state)=>{
            state.tweet.isLiked = false;
            state.tweet.likesCount-=1;
        },
        TWEET_UNLIKED_FAILED:(state)=>{
            state.tweet.isLiked = true;
            state.tweet.likesCount+=1;
        },
        TWEET_RETWEETED_SUCCESS:(state)=>{
            state.tweet.isRetweeted = true
            state.tweet.retweetCount+=1;
        },
        TWEET_RETWEETED_FAILED:(state)=>{
            state.tweet.isRetweeted = false;
            state.tweet.retweetCount-=1;
        }

    },
})


export const {
    FETCHING_TWEET_FAIL,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_RETWEETED_FAILED,
    TWEET_RETWEETED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
} = tweetSlice.actions;
export {initialState};
export default tweetSlice.reducer;