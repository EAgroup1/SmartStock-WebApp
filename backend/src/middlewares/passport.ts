import User from '../models/user';
import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'tokentest'
};

export default new Strategy(opts, async(payload, done) =>{
    try{
        const user = await User.findById(payload.id);
        if(user){
            return done(null,user);
        }
        return done(null, false);
    } catch(err){
        console.log(err);
    }
});