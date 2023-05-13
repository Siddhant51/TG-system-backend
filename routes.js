const express = require("express");
const {
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
  SetComment,
  GetComments,
  Pitcure,
  SetPersonalInfo,
  GetPersonalInfo,
  SetAttendance,
  GetAttendance,
  SetAchievement,
  GetAchievement,
} = require("./controller");

const router = express.Router();

require("./server");

router.post("/login", Login);

router.post("/adminlogin", AdminLogin);

router.post("/setclass", SetClass);

router.post("/setgroup", SetGroup);

router.post("/setuser", SetUser);

router.post("/getclasses", GetClasses);

router.post("/getgroups", GetGroups);

router.post("/getusers", GetUsers);

router.post("/register", Register);

router.post("/create", Create);

router.post("/posts", Posts);

router.post("/setcomment", SetComment);

router.post("/getcomments", GetComments);

router.post("/picture", Pitcure);

router.post("/setpersonalinfo", SetPersonalInfo);

router.post("/getpersonalinfo", GetPersonalInfo);

router.post("/setattendance", SetAttendance);

router.post("/getattendance", GetAttendance);

router.post("/setachievement", SetAchievement);

router.post("/getachievement", GetAchievement);
module.exports = router;
