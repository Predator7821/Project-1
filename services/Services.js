import {Actor} from '../models/GetActor.js'
import {Movie} from '../models/GetMovie.js'
import {PremiumMovie} from '../models/GetPremiumMovie.js'
import {User} from '../models/GetUser.js'

export const actors = () =>{
    return Actor.find({});
}

export const movies = ()=>{
    return Movie.find({});
}

export const singleMovie = (_id)=>{
   return Movie.findOne({ _id: req.params.movieid })
}

export const premiums = ()=>{
    return PremiumMovie.find({});
}

export const users = ()=>{
    return User.find({});
}