const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
});

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  media: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  class: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
});

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  class: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
});

const attendanceSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pdf: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  class: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
});

const achievementSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pdf: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  class: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
});

const personalinfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branch_name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  seatno: {
    type: String,
    required: true,
  },
  prnno: {
    type: String,
    required: true,
  },
  blood_grp: {
    type: String,
    required: true,
  },
  // dob: {
  //   type: Date,
  //   required: true,
  // },
  s_phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  s_address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    required: true,
  },
  f_name: {
    type: String,
    required: true,
  },
  f_phone: {
    type: String,
    required: true,
  },
  m_name: {
    type: String,
    required: true,
  },
  m_phone: {
    type: String,
    required: true,
  },
  parent_address: {
    type: String,
    required: true,
  },
  // hasInput: {
  //   type: String,
  //   required: true,
  // },
  // company: {
  //   type: String,
  //   required: false,
  // },
  // designation: {
  //   type: String,
  //   required: false,
  // },
  // location: {
  //   type: String,
  //   required: false,
  // },
  class: {
    type: String,
    required: false,
  },
  group: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(user.password, 8);
  }
  next();
});

adminSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(user.password, 8);
  }
  next();
});

const Class = mongoose.model("Class", classSchema);
const Group = mongoose.model("Group", groupSchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
const PersonalInfo = mongoose.model("PersonalInfo", personalinfoSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);
const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = {
  Class,
  Group,
  User,
  Admin,
  Post,
  PersonalInfo,
  Comment,
  Attendance,
  Achievement,
};
