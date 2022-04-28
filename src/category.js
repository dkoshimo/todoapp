/*カテゴリの新規登録 API
postCategory = async function (body) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    const sql = "INSERT INTO todoapp.m_category(category_name) VALUES(?);";
    let d = [body.categoryName];
    const [rows, fields] = await connection.query(sql, d);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};
*/
