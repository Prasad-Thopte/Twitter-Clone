import {
    createSlice,current
} from "@reduxjs/toolkit";

const initialState = {
    likedTweets:null,
    tweets:null,
    tweetsFetching:true,
    likedTweetFetching:true,
    tweetFetchingError:null,
    likedTweetsFetchingError:null,
}


export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        TWEETS_FETCH_SUCCESS:(state,action)=>{
            state.tweets = action.payload;;
            state.tweetsFetching = false;
        },
        TWEETS_FETCH_FAILED:(state,action)=>{
            state.tweetFetchingError = action.payload;
            state.tweetsFetching = false;
        },
        TWEETS_FETCHING_STARTED:(state)=>{
            state.tweetsFetching = true;
        },
        TWEET_LIKED_SUCCESS:(state,action)=>{
            
            const {tweetid,from} = action.payload;

            from === 'tweets'?
                state.tweets.find(tweet => tweet._id === tweetid).isLiked=true
                :
                state.likedTweets.find(tweet => tweet._id === tweetid).isLiked=true
            
        },
        TWEET_LIKED_FAILED:(state,action)=>{
            const {tweetid,from} = action.payload;

            from === 'tweets'?
                state.tweets.find(tweet => tweet._id === tweetid).isLiked=false
                :
                state.likedTweets.find(tweet => tweet._id === tweetid).isLiked=false
        },
        TWEET_UNLIKED_SUCCESS:(state,action)=>{
            const {tweetid,from} = action.payload;

            from === 'tweets'?
                state.tweets.find(tweet => tweet._id === tweetid).isLiked=false
                :
                state.likedTweets.find(tweet => tweet._id === tweetid).isLiked=false
        },
        TWEET_UNLIKED_FAILED:(state,action)=>{
            const {tweetid,from} = action.payload;

            from === 'tweets'?
                state.tweets.find(tweet => tweet._id === tweetid).isLiked=true
                :
                state.likedTweets.find(tweet => tweet._id === tweetid).isLiked=true
        },
        LIKED_TWEETS_FETCH_SUCCESS:(state,action)=>{
            state.likedTweets = action.payload;;
            state.likedTweetFetching = false;
        },
        LIKED_TWEETS_FETCH_FAILED:(state,action)=>{
            state.likedTweetsFetchingError = action.payload;
            state.likedTweetFetching = false;
        },
        LIKED_TWEETS_FETCHING_STARTED:(state)=>{
            state.likedTweetFetching = true;
        },

    },
})
export const {
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_FAILED,
    TWEETS_FETCH_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    LIKED_TWEETS_FETCHING_STARTED,
    LIKED_TWEETS_FETCH_FAILED,
    LIKED_TWEETS_FETCH_SUCCESS,
} = feedSlice.actions;
export default feedSlice.reducer;