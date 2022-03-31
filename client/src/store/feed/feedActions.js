import {
    fetchTheTweet,
    likeTheTweet,
    unlikeTheTweet
} from "../../services/tweetService";
import {
    fetchTheUserLikedTweets,
    fetchTheUserMediaTweets,
    fetchTheUserTweets
} from "../../services/userServices";

import {
    TWEETS_FETCHING_STARTED,
    TWEETS_FETCH_SUCCESS,
    TWEETS_FETCH_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    LIKED_TWEETS_FETCHING_STARTED,
    LIKED_TWEETS_FETCH_FAILED,
    LIKED_TWEETS_FETCH_SUCCESS,
    MEDIA_TWEETS_FETCHING_STARTED,
    MEDIA_TWEETS_FETCH_SUCCESS,
    MEDIA_TWEETS_FETCH_FAILED,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS,
    FETCHING_TWEET_FAIL,
} from "./feedSlice"

export const fetchUserTweets = (userid) => async (dispatch) => {
    try {
        dispatch(TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserTweets(userid);
        dispatch(TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        dispatch(TWEETS_FETCH_FAILED(error.message))

    }
}
export const likeTweet = (tweetid, from) => async (dispatch) => {
    try {
        dispatch(TWEET_LIKED_SUCCESS({
            tweetid,
            from
        }))
        await likeTheTweet(tweetid);

    } catch (error) {
        dispatch(TWEET_LIKED_FAILED({
            error: error.message,
            from
        }))
    }
}
export const unlikeTweet = (tweetid, from = 'tweets') => async (dispatch) => {
    try {
        dispatch(TWEET_UNLIKED_SUCCESS({
            tweetid,
            from
        }))
        await unlikeTheTweet(tweetid);

    } catch (error) {
        dispatch(TWEET_UNLIKED_FAILED({
            error,
            from
        }))
    }
}

export const fetchUserLikedTweets = (userid) => async (dispatch) => {
    try {
        dispatch(LIKED_TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserLikedTweets(userid);
        dispatch(LIKED_TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        dispatch(LIKED_TWEETS_FETCH_FAILED(error.message))

    }
}

export const fetchUserMediaTweets = (userid) => async (dispatch) => {
    try {
        dispatch(MEDIA_TWEETS_FETCHING_STARTED())
        const tweets = await fetchTheUserMediaTweets(userid);
        dispatch(MEDIA_TWEETS_FETCH_SUCCESS(tweets))
    } catch (error) {
        dispatch(MEDIA_TWEETS_FETCH_FAILED(error.message))

    }
}
export const fetchTweet = (tweetid) => async (dispatch) => {
    try {
        if (!tweetid) throw new Error('No tweet id provided')
        dispatch(FETCHING_TWEET_STARTED())
        const data = await fetchTheTweet(tweetid);
        dispatch(FETCHING_TWEET_SUCCESS(data.tweet))
    } catch (error) {
        dispatch(FETCHING_TWEET_FAIL(error.message))
    }
}