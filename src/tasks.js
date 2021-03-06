//新規登録処理
const mysql = require("mysql2/promise");
const config = require("../config.js");

/*タスクの新規登録 API*/
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

/*タスク一覧の取得する API*/
getTasks = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status,t_task.updated_at,t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id;";
    const [rows, fields] = await connection.query(sql);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/*タスク一件を取得する API*/
getTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE t_task.id = ?";

    let d = [id];
    const [rows, fields] = await connection.query(sql, d);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/*タスク一件を更新する API*/
patchTasksId = async function (id, body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql =
      "UPDATE t_task SET task_name=?,deadline=?, category_id=?, task_status=?, updated_at=? WHERE id=?;";

    let d = [
      body.taskName,
      body.deadline,
      body.category,
      body.status,
      new Date(),
      id,
    ];
    const [rows, fields] = await connection.query(sql, d);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/*タスク一件を削除する API*/
deleteTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);

    const sql = "DELETE from t_task WHERE id = ?;";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.postTasks = postTasks;
exports.getTasks = getTasks;
exports.getTasksId = getTasksId;
exports.patchTasksId = patchTasksId;
exports.deleteTasksId = deleteTasksId;
