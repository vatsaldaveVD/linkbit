const express = require("express");
const shortid = require("shortid");
const mongoose = require("mongoose");
const useragent = require("useragent");
const geoip = require("geoip-lite");
const requestIp = require("request-ip");
const UAParser = require("ua-parser-js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const DeviceDetector = require("node-device-detector");
const ct = require("countries-and-timezones");

const app = express();
const port = process.env.PORT || 5050;
dotenv.config();

const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT;
const REFRESH_SECRET = process.env.REFRESH;
let refreshTokens = {};

mongoose
  .connect(mongoURI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Model's
const Link = require("./model/link.model");
const User = require("./model/user.model");

// Middleware's
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestIp.mw());
app.use(require("cors")());
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

app.post("/signup", async (req, res) => {
  console.log("Signup Request Body:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, Email, and Password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
});

app.post("/login", async (req, res) => {
  console.log("Login Request Body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email and password are required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.send("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      return res.send("Invalid credentials");
    }

    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET);

    refreshTokens.push(refreshToken);

    res.json({
      message: "Login successful!",
      accessToken,
      refreshToken,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.send("Failed to login");
  }
});

app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).send(" Refresh token is invalid");
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid refresh token");

    const newAccessToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken: newAccessToken });
  });
});

app.post("/shorten", async (req, res) => {
  const originalUrl = req.body.url;
  const userId = req.body.userEmail;
  const bodyShortId = req.body.shortId;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }
  if (!userId) {
    return res
      .status(400)
      .json({ error: "Email required to create short URL" });
  }

  try {
    new URL(originalUrl);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let shortId;
  let linkExists;

  if (!bodyShortId) {
    do {
      shortId = shortid.generate();
      linkExists = await Link.findOne({
        shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
      });
    } while (linkExists);
  }

  const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;

  try {
    const newLink = new Link({
      originalUrl,
      shortUrl,
      createdBy: userId,
      urlHitCount: 0,
    });
    await newLink.save();

    res.json({ shortUrl });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.get("/top-performing/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;

  if (!userEmail) {
    return res.status(400).json({ error: "User email is required" });
  }

  try {
    const links = await Link.find({ createdBy: userEmail })
      .sort({ urlHitCount: -1 })
      .limit(5);

    if (!links || links.length === 0) {
      return res.status(404).json({ error: "No URLs found for this user" });
    }

    res.json({ topUrls: links });
  } catch (error) {
    console.error("Error fetching top performing links:", error);
    return res.status(500).json({ error: "Failed to fetch top URLs" });
  }
});

app.get("/top-analtytics/:userEmail", async (req, res) => {
  try {
    const links = await Link.find({ createdBy: req.params.userEmail });

    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + link.urlHitCount, 0);

    const browserCounts = {};
    const countryCounts = {};
    const deviceCounts = { smartphone: 0, Tablet: 0, Desktop: 0 };

    links.forEach((link) => {
      link.analyticLogs.forEach((log) => {
        browserCounts[log.browser] = (browserCounts[log.browser] || 0) + 1;
        countryCounts[log.country] = (countryCounts[log.country] || 0) + 1;

        if (log.deviceType) {
          const deviceType =
            log.deviceType.charAt(0).toUpperCase() + log.deviceType.slice(1);
          if (deviceCounts.hasOwnProperty(deviceType)) {
            deviceCounts[deviceType]++;
          }
        }
      });
    });

    const timezoneCounts = {};
    links.forEach((link) => {
      link.analyticLogs.forEach((log) => {
        timezoneCounts[log.timezone] = (timezoneCounts[log.timezone] || 0) + 1;
      });
    });

    const sortedTimezones = Object.entries(timezoneCounts).sort(
      (a, b) => b[1] - a[1]
    );

    const top5Timezones = {};
    const otherTimezonesCount = sortedTimezones.reduce(
      (sum, [timezone, count], index) => {
        if (index < 5) {
          top5Timezones[timezone] = count;
          return sum;
        }
        return sum + count;
      },
      0
    );

    const timezoneStats = {
      ...top5Timezones,
      Others: otherTimezonesCount,
    };

    const topBrowser =
      Object.entries(browserCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "Unknown";

    res.json({
      basicStats: {
        "No. of Short Links": totalLinks,
        "Total no of Click": totalClicks,
        "Top Browser Use": topBrowser,
      },
      countryStats: countryCounts,
      deviceStats: deviceCounts,
      "Top Timezone": timezoneStats,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

app.get("/analytics/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const link = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.json({ analytics: link.analyticLogs });
  } catch (error) {
    console.error("Error fetching from MongoDB:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

app.get("/links/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  const page = parseInt(req.query.page) || 1; // Default to first page
  const limit = 10;

  if (!userEmail) {
    return res.status(400).json({ error: "User email is required" });
  }

  try {
    const totalDocs = await Link.countDocuments({ createdBy: userEmail });
    const totalPages = Math.ceil(totalDocs / limit);

    const links = await Link.find({ createdBy: userEmail })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!links || links.length === 0) {
      return res.status(404).json({ error: "No URLs found for this user" });
    }

    res.json({
      urls: links,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalDocs,
    });
  } catch (error) {
    console.error("Error fetching user links:", error);
    return res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

// Get shortId
app.get("/shortId", async (req, res) => {
  do {
    shortId = shortid.generate();
    linkExists = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });
  } while (linkExists);
  res.json({ shortId: shortId });
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const url = `${req.protocol}://${req.get("host")}/${shortId}`;
    const link = await Link.findOne({
      shortUrl: url,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found", url: url });
    }

    link.urlHitCount++;

    const userAgent = useragent.parse(req.headers["user-agent"]);
    const result = detector.detect(req.headers["user-agent"]);
    console.log("Result Parse: ", result);
    const ip = req.clientIp;
    const geo = geoip.lookup(ip);
    const parser = new UAParser(req.headers["user-agent"]);
    const browser = parser.getBrowser();
    const os = parser.getOS();

    link.analyticLogs.push({
      timezone:
        `UTC ${ct.getTimezone(geo.timezone).utcOffsetStr}` || geo.timezone,
      ipAddress: ip,
      country: geo ? geo.country : "Unknown",
      referer: req.headers.referer || "Unknown",
      browser: result.client.name || browser.name || "Unknown",
      browserVersion: result.client.version || browser.version || "Unknown",
      os: result.os.name || os.name || userAgent.os.family || "Unknown",
      osVersion: result.os.version || os.version || "Unknown",
      deviceModel: result.device.model || "Unknown",
      deviceType: result.device.type || "Unknown",
    });

    await link.save();
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error("Error fetching/updating from MongoDB:", error);
    res.status(500).json({ error: "Failed to redirect" });
  }
});

app.put("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const newUrl = req.body;

  if (!newUrl) {
    return res.status(400).json({ error: "New URL is required" });
  }

  try {
    new URL(newUrl);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    const link = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    link.originalUrl = newUrl;
    await link.save();

    res.json({ message: "URL updated successfully", newUrl: link.originalUrl });
  } catch (error) {
    console.error("Error updating URL:", error);
    res.status(500).json({ error: "Failed to update URL" });
  }
});

app.delete("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const link = await Link.findOne({
      shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    });

    if (!link) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    if (link.deletedAt) {
      return res.status(400).json({ error: "Short URL already deleted" });
    }

    link.deletedAt = new Date();
    await link.save();

    res.json({ message: "Short URL marked for deletion" });
  } catch (error) {
    console.error("Error marking URL for deletion:", error);
    res.status(500).json({ error: "Failed to delete URL" });
  }
});

app.get("/auth_form", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Authentication Demo</title>
      </head>
      <body>
          <h1>Sign Up</h1>
          <form method="POST" action="/signup">
              <label for="signupUsername">Username:</label><br>
              <input type="text" id="signupUsername" name="username" required><br><br>

              <label for="signupEmail">Email:</label><br>
              <input type="email" id="signupEmail" name="email" required><br><br>

              <label for="signupPassword">Password:</label><br>
              <input type="password" id="signupPassword" name="password" required><br><br>

              <button type="submit">Sign Up</button>
          </form>

          <h1>Login</h1>
          <form method="POST" action="/login">
              <label for="loginUsername">Username or Email:</label><br>
              <input type="text" id="loginUsername" name="username" required><br><br>

              <label for="loginPassword">Password:</label><br>
              <input type="password" id="loginPassword" name="password" required><br><br>

              <button type="submit">Login</button>
          </form>
      </body>
      </html>
  `);
});

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>URL Shortener</title>
        </head>
        <body>
            <h1>URL Shortener</h1>
            <form method="POST" action="/shorten">
                <input type="url" name="url" placeholder="Enter URL" required><br><br>
                <input type="email" name="userEmail" placeholder="Enter email" required><br><br>
                <button type="submit">Shorten</button>
            </form>
        </body>
        </html>
    `);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
