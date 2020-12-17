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
        await pool.connect();
        let result = await pool
          .request()
          .query(
            `select top 20 (select A.F_SName from T_COMPANY A where A.F_ID = H.F_Customer) as ACCOUNT, (select B.F_SName from T_COMPANY B where B.F_ID = H.F_Shipper) as SHIPPER, (select C.F_ContainerNo from T_OIMCONTAINER C where C.F_OIMBLID=M.F_ID) as CONTAINER, M.F_MBLNo as MBL, M.F_RefNo as REF, H.F_Description as ITEM, M.F_ETA as ETA, M.F_ETD as ETD, M.F_Vessel as VESSEL, M.F_Voyage as VOYAGE, M.F_LoadingPort as LOADING, M.F_DisCharge as DISCHARGE, M.F_FinalDest as DEST, M.F_MoveType as TYPES, H.F_HBLNo as HBL, H.F_CustRefNo as CUSTREF, H.F_PKGS as PKG, H.F_Punit as UNIT, H.F_FETA as HFETA, H.F_MarkPkg as MARKPKG, H.F_MarkGross as GROSS, H.F_MarkMeasure as VOL, H.F_Operator as PIC from T_OIMMAIN M join T_OIHMAIN H on M.F_ID = H.F_OIMBLID WHERE H.F_Customer='1140' ORDER BY H.F_ID DESC;`
          );
        if (result.rowsAffected[0]) {
          // IF THERE IS DATA RETURN RESULT
          res.statusCode = 200;
          res.end(
            JSON.stringify(result.recordsets[0])
          );
        } else {
          // IF THERE IS NO DATA RETURN FALSE STATUS
          res.end(JSON.stringify({ status: false }));
        }
      } catch (err) {
        return { err: err };
      } finally {
        pool.close();
        resolve()
      }
    }
    NEW()
    resolve()
  });
};
