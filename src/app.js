const sql = require("mssql");
const fs = require("fs");
const uui = require("uuid/v1");
const moment = require("moment");
let timestamp = moment(new Date()).format("HHmmssDDMMYYYY");
const dirPath = "./arquivos_json/";

const config = {
  user: "sa",
  password: "P!csdor",
  server: "10.25.133.25",
  database: "Ris"
};

async function execute_query() {
  try {
    let pool = await sql.connect(config);
    return await pool
      .request()
      .input("input_parameter", sql.Int, true)
      .query("select top 10 * from ris.dbo.atendimento");
  } catch (err) {
    console.error("ERRO ", err);
  }
}

function a() {
  execute_query().then(data => {
    data.recordset.forEach(element => {
      let id_atend = element.id_atend;
      let arquivo = element.idUnidade + id_atend+".js";
      
      fs.writeFile(dirPath+arquivo, JSON.stringify(element), function(err) {
        console.log(arquivo)
        if (err) throw err;
        console.log("Saved! ", arquivo);
      });
    });
  });
}
sql.on("error", err => {
  console.error("Erro ", err);
});

setInterval(a, 3000);
