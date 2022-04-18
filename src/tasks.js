const mysql = require("mysql12/promise");
const config = require("../config.js");

postTasks = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "INSERT INTO todoapp.t_task(task_name, deadline, category_id) VALUES(?,?,?);";
    let d = [body.taskName, body.deadline, body.category];
    const [rows, fields] = await connection.query(sql, d);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.postTasks = post.postTasks;