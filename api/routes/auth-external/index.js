const app = require("../../app");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use(cors());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // This function is called when the user has authorized your app
      // You can handle user creation or retrieval based on their profile data
      // Typically, you would store the user's information in your database and return it
      const user = {
        id: profile.id,
        username: profile.displayName,
        // Add more user profile information here as needed
      };

      // Store the user in the session
      req.session.user = user;
      return done(null, profile);
    }
  )
);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route that Google will redirect to after user authorization
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to a success page or handle as needed
    res.redirect("/success");
  }
);

// Route to log out
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = app;
