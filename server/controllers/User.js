const mongoose = require("mongoose");
const User = require("../model/Users");
const nodemailer = require('nodemailer');
// create, find, update, delete
const ITEMS_PER_PAGE = 20;
// view users
exports.view = async (req, res, next) => {
  const page = +req.query.page || 1;
  try {
    const totalRecords = await User.countDocuments();
    // find user and pagination records
    const users = await User.find({ status: 'active' })
      .lean() // for accept json format on page
      .sort({ createdAt: -1 }) // sort by createdAt 
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    res.render("home", {
      users,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalRecords,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalRecords / ITEMS_PER_PAGE)
    });
  } catch (error) {
    next(error);
  }
};
// view user
exports.viewUser = async (req, res, next) => {

  try {
    const user = await User.findById({ _id: req.params.id, status: 'active' }).lean();
    if (!user) {
      res.render("view-user", {
        alert: "User not found",
      });
    } else {
      res.render("view-user", {
        user
      });
    }
  } catch (error) {
    next(error);
  }
};
// find
exports.find = async (req, res, next) => {

  try {
    const user = await User.findOne({ firstName: req.body.keyword, status: 'active' }).lean();
    if (!user) {
      res.render("view-user", {
        alert: "User not found",
      });
    } else {
      res.render("view-user", {
        user
      });
    }
  } catch (error) {
    next(error);
  }
};

// New User
exports.form = async (req, res, next) => {

  res.render("add-user");
};

exports.addUSer = async (req, res, next) => {
  const { firstName, lastName, email, phone, comments } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.render('add-user', { alert: `${firstName} ${lastName} was added to list` });
    } else {
      await User.create({ email: email, firstName: firstName, lastName: lastName, phone: phone, comments: comments });
      res.render('add-user', { alert: 'Added This User Successfully' });
    }
  } catch (error) {
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).lean();
    if (!user) {
      res.render("edit-user", { alert: "User Not Found" });
    } else {
      res.render("edit-user", { user });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {

  const { firstName, lastName, email, phone, comments } = req.body;

  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          comments: comments,
        },
      },
      {
        new: true,
      }, (err, user) => {
        if (err) {
          res.render('edit-user', { alert: "Error is occred!!!" })
        } else {
          res.render(
            "edit-user",
            { user, alert: `${user.firstName} ${user.lastName} was updated successfully!` },

          )
        }
      }
    ).lean();
  } catch (error) {
    next(error);
  }
};

// do not remove user instead of we change its status is removed and not display it to user
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: {
        status: "removed"
      }
    }, {
      new: true
    });

    if (!user) {
      res.render("home.hbs", { alert: "Error Occured!!!" });
    } else {
      res.redirect("/?removed=true/" + `${user._id}`);
    }
  } catch (error) {
    next(error);
  }
};

exports.sendEmail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id, status: 'active' }).lean();
    console.log(user);
    res.render('sendEmail.hbs', { user });
  } catch (error) {
    next(error);
  }
}

let mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: "gmail",
  secure: true,
  port:465,
  auth: {
    user: process.env.USER_AUTH_MAIL,
    pass: process.env.PASS_AUTH_MAIL
  }
});
exports.sendEmailToUser = async (req, res, next) => {
  try {
    const {email, subject, message} = req.body;
    const mailOptions = {
      from: process.env.USER_AUTH_MAIL,
      to : email,
      subject: subject,
      text: message
    }
    await mailTransport.sendMail(mailOptions);
    res.status(200).json({
      message: "Email Sent Successfully"
    });
  }catch(err) {
    next(err);
  }
}