const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const booksdb = require('./router/booksdb.js');
const generalRoutes = require('./router/general.js');
const authUserRoutes = require('./router/auth_users.js');

const app = express();

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
  // Check if the user is authenticated based on the access token in the session
  const accessToken = req.session.accessToken;

  if (!accessToken) {
    // User is not authenticated
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the access token
  jwt.verify(accessToken, "your-secret-key", (err, decoded) => {
    if (err) {
      // Invalid token
      return res.status(401).json({ message: "Unauthorized" });
    }

    // User is authenticated, you can access the decoded information if needed
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  });
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
