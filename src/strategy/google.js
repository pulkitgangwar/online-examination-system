import GoogleStrategy from "passport-google-oauth2";
import passport from "passport";
import { User } from "../models/User.js";

export const initializeGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          console.log(profile);
          console.log(typeof profile.id);
          console.log(typeof profile.email);
          console.log(typeof profile.displayName);
          console.log(typeof profile.picture)
          const user = await User.findOne({ where: { email: profile.email } });
          if (user) {
            return done(null, {
              id: user.getDataValue("id"),
              email: user.getDataValue("email"),
              role: user.getDataValue("role"),
            });
          }

          const savedUser = await User.create({
            id: parseInt(profile.id),
            email: profile.email,
            name: profile.displayName,
            picture: profile.picture,
          });

          done(null, {
            id: savedUser.getDataValue("id"),
            email: savedUser.getDataValue("email"),
            role: savedUser.getDataValue("role"),
          });
        } catch (err) {
          console.log(err);
          console.log(err.message);
          console.log("problem in storing user");
          done(err, null);
        }  
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("used the serlize user function");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
        role: user.getDataValue("role"),
      });
    } catch (err) {
      done(err, null);
    }
  });
};
