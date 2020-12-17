import sql from "mssql";
import jwt from 'jsonwebtoken'
import cookie from "cookie";
const FSConfig = {
  server: process.env.JWDB_SVR,
  database: process.env.JWDB_1,
  user: process.env.JWDB_USER,
  password: process.env.JWDB_PASS,
  options: {
    appName: "test",
    encrypt: false,
    enableArithAbort: false,
  },
};

export default (req, res) => {
  return new Promise((resolve) => {
    try {
      const Token = jwt.decode(req.headers.token)
      


      const A = Token.account.map((ga, i) => {
        if (i) {
          return ` OR F_Customer='${ga}'`;
        } else {
          return `F_Customer='${ga}'`;
        }
      });
      const QRY = A.join('')
      var request = new sql.Request();
      if (A.length > 0) {
        request.query(
          `SELECT
                    TOP 50 H.F_ID,
                    C.F_SName AS Customer,
                    H.F_HBLNo AS HBL,
                    M.F_MBLNo AS MBL,
                    M.F_RefNo AS REF,
                    M.F_ETA AS ETA,
                    M.F_ETD AS ETD
                FROM
                    T_OIHMAIN H
                    INNER JOIN T_COMPANY C ON H.F_Customer = C.F_ID
                    INNER JOIN T_OIMMAIN M ON H.F_OIMBLID = M.F_ID
                WHERE
                    ${QRY}
                ORDER BY
                    H.F_ID DESC;`,
          function (err, data) {
            if (err) console.log(err);
            if (data) {
              res.statusCode = 200;
              res.end(JSON.stringify(data.recordset));
            } else {
              res.status(400).end(false);
            }
          }
        );
      } else {
        res.statusCode = 400;
        res.end(JSON.stringify({ ERROR: "NO DATA" }));
      }
      return resolve();
    } catch (err) {
      console.log(err);
      res.status(500).end();
      return resolve();
    }
    res.status(405).end();
    return resolve();
  });
};

// const sql = `select * from t_oimmain where F_ID<>"" `

// if a != ""
// {
//   sql = sql + " f_name = fieldA
// }

// if b != ""
// {
//   sql = sql + " and f_name = fieldA
// }

// sql = sql + "order by f_id"

// var sql = `select top 10 * from V_JWI_OIMSRC where F_ID<>''`
// var option = ['MBL', 'REF']
// if(option.length) {
//   option.map(data=>sql += `OR ${data}`)
// }

// sql += 'order by F_ID desc;'