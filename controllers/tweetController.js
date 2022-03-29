const Tweet = require('../models/Tweet');
const Hashtags = require('../models/Hashtags');
const Mentions = require('../models/Mentions');
const TweetLike = require('../models/TweetLikes');
const User = require('../models/User')
const linkify = require('linkifyjs');
require('linkify-plugin-hashtag');
require('linkify-plugin-mention');
const Mongoose = require("mongoose");
const {
    cloudinary
} = require("../services/cloudinary");


module.exports.postTweet = async (req, res, next) => {
    const currentUser = res.locals.user;
    try {
        let {
            caption,
            pic
        } = req.body;
        if (!pic) pic = null
        if (!caption) return res.send({
            error: 'tweet body can not be empty!'
        })


        // add to tweet collection
        const tweet = await Tweet.create({
            user: currentUser._id,
            caption,
            pic
        });
        if (pic) {
            const tweetPicResponse = await cloudinary.uploader.upload(pic, {
                upload_presset: 'tweet_images',
                folder: 'tweet_images',
                public_id: tweet._id
            })
            await Tweet.updateOne({
                _id: tweet._id
            }, {
                $set: {
                    pic: tweetPicResponse.secure_url
                }
            })
        }
        const tweetHashtags = new Set();
        const tweetMentions = new Set();
        const linkifyData = linkify.find(caption);
        linkifyData.forEach(e => {
            if (e.type === 'hashtag') {
                tweetHashtags.add(e.value)
            } else if (e.type === 'mention') {
                tweetMentions.add(e.value.slice(1))
            }
        })
        let temp = [...tweetMentions]
        let mentionedUsers = await Promise.all(temp.map(async e => {
            let user = await User.findOne({
                username: e
            }, {
                _id: 1
            });
            if (!user) return
            return ({
                user: user._id
            })
        }))

        mentionedUsers = mentionedUsers.filter(e => e)


        // check mentions 
        const MentionsUpdate = await Mentions.updateOne({
            tweet: tweet._id,
        }, {
            $push: {
                mentions: {
                    $each: [...mentionedUsers]
                }
            }
        }, {
            upsert: true
        });
        // check hashtags
        const hashtagsUpdate = await Hashtags.updateOne({
            tweet: tweet._id,
        }, {
            $push: {
                hashtags: {
                    $each: [...tweetHashtags]
                }
            }
        }, {
            upsert: true
        });
        // send notification for mentioned user
        res.status(201).send()
    } catch (error) {
        next(error)
        console.log(error)
    }
}

module.exports.likeTweet = async (req, res, next) => {
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) {
            return res.status(400).send({
                error: 'please provide tweetid to like!'
            })
        }
        const tweetLikeUpdate = await TweetLike.updateOne({
            tweet: tweetid,
            'likedBy.user': {
                $ne: currentUser._id
            }
        }, {
            $push: {
                likedBy: {
                    user: currentUser._id
                }
            }
        }, {
            upsert: true
        });
        res.status(200).send('success');
    } catch (error) {
        next(error)
    }
}

module.exports.unlikeTweet = async (req, res, next) => {
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) {
            return res.status(400).send({
                error: 'please provide tweetid to UNlike!'
            })
        }
        const tweetLikeUpdate = await TweetLike.updateOne({
            tweet: tweetid,
            'likedBy.user': {
                $eq: currentUser._id
            }
        }, {
            $pull: {
                likedBy: {
                    user: currentUser._id
                }
            }
        });
        res.status(200).send('success');
    } catch (error) {
        next(error)
    }
}

module.exports.fetchTweet = async (req, res, next) => {
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })

        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Invalid tweetid'
        })

        const pipeline = [{
                $facet: {
                    tweet: [{
                            $match: {
                                _id: Mongoose.Types.ObjectId(tweetid),
                            }
                        }, {
                            $lookup: {
                                from: 'users',
                                localField: 'user',
                                foreignField: '_id',
                                as: 'user'
                            }
                        }, {
                            $unwind: {
                                path: '$user'
                            }
                        }, {
                            $addFields: {
                                'user': '$user'
                            }
                        },
                        {
                            $project: {
                                __v: 0,
                                'user.password': 0,
                                'user.bio': 0,
                                'user.email': 0,
                                'user.website': 0,
                                'user.location': 0,
                                'user.backgroundImage': 0,
                                'user.__v': 0,
                            }
                        },
                        {
                            $lookup: {
                                from: 'tweetlikes',
                                localField: '_id',
                                foreignField: 'tweet',
                                as: 'tweetLikes'
                            }
                        }, {
                            $addFields: {
                                tweetLikes: {
                                    $cond: [{
                                            $eq: ["$tweetLikes", []]
                                        },
                                        [{
                                            likedBy: []
                                        }], '$tweetLikes'
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$tweetLikes',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $addFields: {
                                tweetLikes: '$tweetLikes.likedBy'
                            }
                        },
                        {
                            $addFields: {
                                isLiked: {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$tweetLikes.user']
                                }
                            }
                        },
                        {
                            $project: {
                                tweetLikes: 0,
                            }
                        }



                    ],
                }
            },
            {
                $project: {
                    tweet: {
                        $arrayElemAt: ['$tweet', 0]
                    },
                }
            }


        ];
        const data = await Tweet.aggregate(pipeline);
        res.status(200).send(data[0])
    } catch (error) {
        next(error)
    }
}