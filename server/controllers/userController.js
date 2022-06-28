const express = require("express");
const mysql = require("mysql");

//Connect to DB mySql
let pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

// create, find, update, delete

// view users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    console.log("Connected as ID " + connection.threadId);

    connection.query("select * from user", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        throw err;
      }
      console.log("The data from user table: ", rows);
    });
  });
};

// find
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    let keyword = req.body.keyword;
    connection.query(
      "SELECT * FROM user WHERE firstName OR lastName LIKE ?",
      ["%" + keyword + "%", ["%" + keyword + "%"]],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("home", { rows });
        } else {
          throw err;
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
};

// New User
exports.form = (req, res) => {
  res.render('add-user')
}


exports.addUSer = (req, res) => {
  const { firstName, lastName, email, phone, comments } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    connection.query('INSERT INTO USER Set firstName=?, lastName=?, email=?, phone=?, comments=?', [firstName.toCapitalize(), lastName.toCapitalize(), email, phone, comments],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render('add-user',{alert: "User Added Successfully"});
        } else {
          console.log("error: ", err.message);
          throw err;
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
}

exports.editUser = (req, res) => {
  const {id} = req.params;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    connection.query('Select * from user where id = ?',[id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render('edit-user',{rows});
        } else {
          console.log("error: ", err.message);
          throw err;
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
}

exports.updateUser = (req, res) => {
  const {firstName, lastName, email, phone, comments} = req.body;
  // user the connection 
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('UPDATE user SET firstName = ?, lastName = ?, email = ?, phone = ?, comments = ? WHERE id = ?',[firstName, lastName, email, phone, comments, req.params.id],
      (err, rows) => {
        if (!err) {
          connection.query('select * from user where id = ?', [req.params.id], (err, rows) => {
            res.render('edit-user',{alert :`${firstName} ${lastName} has been updated `, rows});
          })
        } else {
          console.log("error: ", err.message);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
}

// do not remove user instead of we change its status is removed and not display it to user
exports.deleteUser = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('UPDATE user SET status=? WHERE id=?', ["removed",req.params.id], 
      (err, rows) => {
        if (!err) {
          let removedUser = encodeURIComponent('User Successfully Removed.');
          res.redirect('/?removed='+removedUser);
        } else {
          console.log("error: ", err.message);
        }
        console.log("The data from user table: ", rows);
      }
    );
  });
}