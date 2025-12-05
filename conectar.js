const mongoose = require('mongoose');

const connectionString = "mongodb+srv://admin:lbpass90z3l2v@oquefazerem-db.fsfpwzv.mongodb.net/?appName=OQueFazerEm-DB";

async function testarConexao() {
  try {
    console.log("Tentando conectar ao MongoDB na nuvem...");
    await mongoose.connect(connectionString);
    console.log("✅ SUCESSO! Conexão estabelecida com o MongoDB Atlas.");
    process.exit(0);
  } catch (erro) {
    console.error("ERRO ao conectar:", erro.message);
    process.exit(1);
  }
}

testarConexao();