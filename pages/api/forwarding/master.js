const sql = require("mssql");
const moment = require("moment");

const SQLconfig = {
  server: process.env.JWDB_SVR,
  database: process.env.JWDB_1,
  user: process.env.JWDB_USER,
  password: process.env.JWDB_PASS,
  options: {
    appName: "test",
    encrypt: false,
    enableArithAbort: false,
    database: process.env.JWDB_2,
  },
};

export default async (req, res) => {
  return new Promise((resolve) => {
    async function NEW() {
      const pool = new sql.ConnectionPool(SQLconfig);
      pool.on("error", (err) => {
        console.log("sql error", err);
      });
      try {
        // THROW ERROR IF THERE IS NO USER
        if(req.headers.name === undefined) throw new Error('PLEASE LOG IN');  
        // CREATE LOG HERE
        var Squery = `SELECT TOP 100 * FROM V_JWI_OIMSRC WHERE F_ID<>''`;

        await pool.connect();
        let result = await pool
          .request()
          .query(Squery);
        if (result.rowsAffected[0]) {
          // IF DATA EXISTS RETURN TRUE RESULT
          const results  = {result: true, ocean: result.recordsets[0]}
          res.status(200).end(JSON.stringify(results));
          resolve()
        } else {
          // IF DATA IS NOT EXIST RETURN FALSE RESULT
          res.end(JSON.stringify({ result: false }));
        }
      } catch (err) {
        return res.end(JSON.stringify(`${err}`));
      } finally {
        pool.close();
        resolve()
      }
    }
    NEW()
    resolve()
  });
};
