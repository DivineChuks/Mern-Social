import express from "express";
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import request from "request";
import { body, validationResult } from "express-validator";

const router = express.Router();

// @route    GET api/profile/me
// @desc     Get logged in users profile
// @access   private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["email", "avatar"]
    );
    if (!profile) {
      return res.json({ error: "There is no profile for this user" });
    }
    return res.json({ profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route    POST api/profile
// @desc     Create and update a new users profile
// @access   private

router.post(
  "/",
  [
    auth,
    [
      body("status", "Status is required").not().isEmpty(),
      body("skills", "Skills is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build Profile Object

    const profileFields = {
      user: req.user.id,
      company: company,
      website: website,
      location: location,
      status: status,
      bio: bio,
      githubusername: githubusername,
      skills: skills.split(",").map((skill) => skill.trim()),
    };

    console.log(profileFields.skills);

    profileFields.social = {
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin,
      twitter: twitter,
    };

    try {
      // Check profile

      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      // Create profile

      profile = new Profile(profileFields);

      await profile.save();

      res.json({ profile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["email", "avatar"]);
    return res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["email", "avatar"]);

    if (!profile) {
      return res.json({ msg: "Profile not found" });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "objectId") {
      return res.json({ msg: "Profile not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/profile
// @desc     Delte post, profile and user
// @access   private

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.user.id,
    });

    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: "User deleted" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   private

router.put(
  "/experience",
  [
    auth,
    [
      body("title", "title is required").not().isEmpty(),
      body("company", "company is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const profileExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(profileExp);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    DELETE api/profile/experience
// @desc     Delete profile experience
// @access   private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const index = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(index, 1);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   private

router.put(
  "/education",
  [
    auth,
    [
      body("school", "school is required").not().isEmpty(),
      body("degree", "degree is required").not().isEmpty(),
      body("fieldofstudy", "Field of study is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const profileEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(profileEdu);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    DELETE api/profile/education
// @desc     Delete profile education
// @access   private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const index = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(index, 1);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from github
// @access   public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&cliend_id=${process.env.GITHUBCLIENTID}&client_secret=${process.env.GITHUBSECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.json({ msg: "No github profile found " });
      }
      return res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

export default router;
