const { Group, Class, Post, Admin, User, PersonalInfo} = require("./schema");
const bcrypt = require("bcryptjs");

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "Plz fill all fields" });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log("Login successful");
        res.send({ user });
      } else {
        console.log("Invalid credentials");
      }
    }
  }
};

const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "Plz fill all fields" });
  } else {
    const user = await Admin.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log("Login successful");
        res.send({ user });
      } else {
        console.log("Invalid credentials");
      }
    }
  }
};

const Register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.json({ error: "Plz fill all fields" });
  }

  const userExist = await Admin.findOne({ email: email });
  try {
    if (!userExist) {
      const user = new Admin({ name, email, password, role });
      // bcrypt middleware
      await user.save();
      res.send({ message: "User registered" });
    } else {
      res.send({ message: "User already exists" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const addPersonalInfo = async (req, res) => {
  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const personalInfo = new PersonalInfo(formData);
    await personalInfo.save();

    res.json({ message: "Personal Information Filled Successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Something went wrong" });
  }
};



const Pitcure = async (req, res) => {
  const { userId, profilePic } = req.body;

  const user = await User.findByIdAndUpdate(userId, { profilePic });
  try {
    if (user) {
      res.send({ message: "Updated successfully" });
    } else {
      res.send({ message: "Update was unsuccessful" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const Create = async (req, res) => {
  const { userClass, userGroup, content, media, userId } = req.body;

  try {
    if (!userClass && !userGroup && !content && !media) {
      return res.json({ error: "Plz enter atleast one field" });
    } else {
      const post = new Post({
        class: userClass,
        group: userGroup,
        content,
        media,
        user: userId,
      });
      await post.save();
      res.send({ message: "Posted successfully" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const Posts = async (req, res) => {
  const { userClass, userGroup } = req.body;

  try {
    const posts = await Post.find({
      class: userClass,
      group: userGroup,
    }).populate("user");
    res.send({ posts });
  } catch (error) {
    console.log({ error });
  }
};

const SetClass = async (req, res) => {
  const { className } = req.body;

  if (!className) {
    return res.json({ error: "Plz fill all fields" });
  }

  const classExist = await Class.findOne({ name: className });
  try {
    if (!classExist) {
      const classes = new Class({ name: className });
      await classes.save();
      res.send({ message: "Class created" });
    } else {
      res.send({ message: "Class already exists" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const SetGroup = async (req, res) => {
  const { classId, groupName } = req.body;

  if (!classId || !groupName) {
    return res.json({ error: "Plz fill all fields" });
  }

  const groupExist = await Group.findOne({ name: groupName });
  try {
    if (!groupExist) {
      const group = new Group({ name: groupName, class: classId });
      await group.save();
      res.send({ message: "Group created" });
    } else {
      res.send({ message: "Group already exists" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const SetUser = async (req, res) => {
  const { name, email, password, role, className, groupName } = req.body;

  if (!name || !email || !password || !role || !className || !groupName) {
    return res.json({ error: "Plz fill all fields" });
  }

  const userExist = await User.findOne({ email: email });
  try {
    if (!userExist) {
      const user = new User({
        name,
        email,
        password,
        role,
        class: className,
        group: groupName,
      });
      // bcrypt middleware
      await user.save();
      res.send({ message: "User registered" });
    } else {
      res.send({ message: "User already exists" });
    }
  } catch (error) {
    console.log({ error });
  }
};

const GetClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.send({ classes });
  } catch (error) {
    console.log({ error });
  }
};

const GetGroups = async (req, res) => {
  const { classId } = req.body;

  try {
    const groups = await Group.find({ class: classId }).populate("class");
    res.send({ groups });
  } catch (error) {
    console.log({ error });
  }
};

const GetUsers = async (req, res) => {
  const { className, groupName } = req.body;

  try {
    const users = await User.find({
      class: className,
      group: groupName,
    });
    res.send({ users });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = {
  SetClass,
  SetGroup,
  SetUser,
  GetClasses,
  GetGroups,
  GetUsers,
  Login,
  AdminLogin,
  Register,
  Create,
  Posts,
  Pitcure,
  addPersonalInfo,
};
