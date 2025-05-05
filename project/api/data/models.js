import { constant }   from 'com'
import { Schema, model, Types } from 'mongoose'


const { ObjectId } = Types

const user = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['regular', 'admin'],
        default: 'regular',
        // match: TODO
    },
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        match: constant.EMPTY_OR_BLANK_REGEX && constant.NAME_REGEX
    },
    surname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
        match: constant.EMPTY_OR_BLANK_REGEX && constant.NAME_REGEX
    },
    email: {
        type: String,
        required: true,
        maxLength: 30,
        unique: true,
        match: constant.EMPTY_OR_BLANK_REGEX && constant.EMAIL_REGEX
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
        match: constant.EMPTY_OR_BLANK_REGEX && constant.USERNAME_REGEX
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        // match: TODO
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const game = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    seasonName: {
        type: String,
        ref: 'Season',
        required: true,
        match: constant.EMPTY_OR_BLANK_REGEX_MONGOOSE
    },
    seasonId: {
        type: ObjectId,
        ref: 'Season',
    },
    status: {
        type: String,
        required: true,
        enum: ['scheduled' , 'finished']
        // match: TODO
    },
    title: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true,
        match: constant.EMPTY_OR_BLANK_REGEX_MONGOOSE
    },
    participants: [{
        type: ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        required: true,
       // match: constant.EMPTY_OR_BLANK_REGEX && constant.DATE_REGEX 
    },
    place: {
        type: String,
        minLength: 1,
        maxLength: 200,
        required: true,
        match: constant.EMPTY_OR_BLANK_REGEX && constant.NAME_REGEX
    },
    winner: {
        type: ObjectId,
        ref: 'User',
    },
    points: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const season = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        match: constant.DATE_REGEX
    },
    status: {
        type: String,
        required: true,
        enum: ['active' , 'finished']
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 20,
       
    },
    games: {
        type: ObjectId,
        ref: 'Game'
    },
    winner: {
        type: ObjectId,
        ref: 'User',
    },  
    // maxGames: {
    //     type: Number,
    //     required: true
    // },
    participants: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: null
    }
})

const User = model('User', user)
const Game = model('Game', game)
const Season = model('Season', season)

export {
    User,
    Game,
    Season
}