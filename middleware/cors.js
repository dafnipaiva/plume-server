const cors = require('cors'); // Importando o módulo cors

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'https://plumeapp.netlify.app',
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions); // Exportando o middleware configurado
