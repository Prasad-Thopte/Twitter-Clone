import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching: true,
    guestUser: null,
    fetchingError:null,
    followers:[],
    followings:[],
    tweets:null,
    fetchingFollowers:true,
    fetchingFollowings:true,
    fetchingFollowingsError:null,
    fetchingFollowersError:null,
    tweetsFetching : true,
    tweetFetchingError:null,
}


export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        FETCHING_STARTED:(state)=>{
            state.fetching  = true;
        },
        FETCHING_FINISHED:(state)=>{
            state.fetching  = false;
        },
        FETCHING_GUEST_SUCCESS:(state,action)=>{
            state.guestUser = action.payload;
            state.fetching = false;
        },
        FETCHING_GUEST_FAIL:(state,action)=>{
            state.fetchingError = action.payload;
            state.fetching = false;
        },
        FETCHING_FOLLOWERS_START:(state)=>{
            state.fetchingFollowers = true;
        },
        FETCHING_FOLLOWINGS_START:(state)=>{
            state.fetchingFollowings = true;
        },
        FETCHING_FOLLOWERS_SUCCESS:(state,action)=>{
            state.followers = action.payload;
            state.fetchingFollowers = false;
        },
        FETCHING_FOLLOWINGS_SUCCESS:(state,action)=>{
            state.followings = action.payload;
            state.fetchingFollowings = false;
        },
        FETCHING_FOLLOWERS_FAIL:(state,action)=>{
            state.fetchingFollowersError = action.payload;
            state.fetchingFollowers = false;
        },
        FETCHING_FOLLOWINGS_FAIL:(state,action)=>{
            state.fetchingFollowingsError = action.payload;
            state.fetchingFollowings = false;
        },
        UNFOLLOWED_FROM_FOLLOWERS:(state,action)=>{
            const userid = action.payload
            state.followers.users.find(user => user._id === userid).isFollowing = false;
        },
        FOLLOWED_FROM_FOLLOWERS:(state,action)=>{
            const userid = action.payload
            state.followers.users.find(user => user._id === userid).isFollowing = true;
        },
        UNFOLLOWED_FROM_FOLLOWINGS:(state,action)=>{
            const userid = action.payload
            state.followings.users.find(user => user._id === userid).isFollowing = false;
        },
        FOLLOWED_FROM_FOLLOWINGS:(state,action)=>{
            const userid = action.payload
            state.followings.users.find(user => user._id === userid).isFollowing = true;
        },
        UNFOLLOWED_FROM_PROFILE:(state)=>{
            state.guestUser.isFollowing = false;
        },
        FOLLOWED_FROM_PROFILE:(state)=>{
            state.guestUser.isFollowing = true;
        },
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
            state.tweets.find(tweet => tweet._id === action.payload).isLiked=true
        },
        TWEET_LIKED_FAILED:(state,action)=>{
            state.tweets.find(tweet => tweet._id === action.payload).isLiked=false
        },
        TWEET_UNLIKED_SUCCESS:(state,action)=>{
            state.tweets.find(tweet => tweet._id === action.payload).isLiked=false
        },
        TWEET_UNLIKED_FAILED:(state,action)=>{
            state.tweets.find(tweet => tweet._id === action.payload).isLiked=true
        }

    },
})


export const {
    FETCHING_GUEST_SUCCESS,
    FETCHING_GUEST_FAIL,
    FETCHING_FINISHED,
    FETCHING_STARTED,
    FETCHING_FOLLOWERS_FAIL,
    FETCHING_FOLLOWERS_SUCCESS,
    FETCHING_FOLLOWERS_START,
    FETCHING_FOLLOWINGS_FAIL,
    FETCHING_FOLLOWINGS_START,
    FETCHING_FOLLOWINGS_SUCCESS,
    UNFOLLOWED_FROM_FOLLOWERS,
    FOLLOWED_FROM_FOLLOWERS,
    FOLLOWED_FROM_FOLLOWINGS,
    UNFOLLOWED_FROM_FOLLOWINGS,
    FOLLOWED_FROM_PROFILE,
    UNFOLLOWED_FROM_PROFILE,
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_FAILED,
    TWEETS_FETCH_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS
} = guestSlice.actions
export default guestSlice.reducer;