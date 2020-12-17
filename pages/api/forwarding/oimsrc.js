import { resolve } from 'path';

const sql = require('mssql');
const moment = require('moment');

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
    sql.connect(FSConfig, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();
      
      function OIMSRC() {
        return new Promise(resolve=> {
            request.query(`select * from V_JWI_OIMSRC WHERE V_JWI_OIMSRC.REF='${req.headers.reference}';`, (err, data)=>{
                if (err) console.log(err)
                if(data.rowsAffected[0]){
                    //IF DATA IS NOT EMPTY
                    resolve({status: true, OCEAN: data.recordsets[0]})
                } else {
                  //IF MASTER IS EMPTY
                    resolve({status: false})
                }
            })
        })
      }

      function CONTAINER(OCEAN) {
        var HOUSE, MASTER, CNTRID;
        var TYPE = OCEAN[0].REF.split("-")
        if(TYPE[0]==='OIM') {
            HOUSE='OIH', MASTER='OIM', CNTRID='F_OIMCntID'
        } else {
            HOUSE='OOH', MASTER='OOM', CNTRID='F_OOMCNTID'
        }
          var QRY = OCEAN.map((ga, i)=>{
            if(i) {
                return ` OR T_${HOUSE}CONTAINER.F_${HOUSE}BLID='${ga.F_ID}'`
            } else {
                return `T_${HOUSE}CONTAINER.F_${HOUSE}BLID='${ga.F_ID}'`
            }
          })
          QRY = QRY.join('')
          return new Promise(resolve=> {
              request.query(
                `SELECT DISTINCT T_${MASTER}CONTAINER.* from T_${HOUSE}CONTAINER join T_${MASTER}CONTAINER on T_${MASTER}CONTAINER.F_ID=T_${HOUSE}CONTAINER.${CNTRID} WHERE ${QRY}`,
                (err, data) => {
                  if (err) console.log(err);
                  if (data.rowsAffected[0]) {
                    resolve(data.recordsets[0]);
                  } else {
                    resolve();
                  }
                }
              );
          })
      }

      function AP(OCEAN) {
        var TABLE;
        var TYPE = OCEAN[0].REF.split("-")
        TYPE[0]==='OIM' ? TABLE='T_OIHMAIN' : TABLE='T_OOHMAIN'
        var QRY = OCEAN.map((ga, i)=>{
            if(i) {
                return ` OR F_TBID='${ga.F_ID}' AND F_TBName='${TABLE}'`
            } else {
                return `F_TBID='${ga.F_ID}' AND F_TBName='${TABLE}'`;
            }
        })
        QRY = QRY.join('')
        
          return new Promise(resolve=> {
              request.query(
                `SELECT (SELECT T_COMPANY.F_SName FROM T_COMPANY WHERE T_COMPANY.F_ID=T_APHD.F_PayTo) AS PAY, * FROM T_APHD WHERE ${QRY};`,
                (err, data) => {
                  if (err) console.log(err);
                  if (data.rowsAffected[0]) {
                    resolve(data.recordsets[0]);
                  } else {
                    resolve();
                  }
                }
              );
          })
      }

    async function GET () {
        var result = await OIMSRC();
        if(result.status) {
            const CNTR =  await CONTAINER(result.OCEAN);
            result = {...result, CONTAINER: CNTR || false}
            
            const ACCPAY =  await AP(result.OCEAN);
            result = {...result, AP: ACCPAY || false}
            res.status(200).send(result);
        } else {
          console.log(result)
          res.status(400).send(result)
        }
    }

    GET()
  })
  }

  export const config = {
    api: {
      externalResolver: true,
    },
  };
  