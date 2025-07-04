




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUF1ajIzMUJBT3o0SXBWSHlzN1d6amlralV4SWhOcVlQd2g0QzVRN2RsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTm96Q3hQVVZEMWRwNER3bjN5aHVMVmNrU3NGMUdmU2FRdDJPRzZGSUFGdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTkpQT0hMWU03bTFTTndZOC8yWWdCZ1Jtckl6aFpZSVJoWmpBSkZQc1hzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1VzBGVUdSNTA3dVNWcC9FWllHMkx6YmwxWmtCY2RGcXFnc21pNVlMbG1BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVCaitTam5UZEtZRFhMNXNHUmMyVnpxWUN1NnJ4UHV2b0JjdEVHTGg3RlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklpSVJwQXpGbjZ1cENVYXlKbHlJeGRrRHJTcnNrdXdXZHRLR3VYaHgwMnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BvL3ZDTE82bU5xZ3B0LzFKMzZOWFFqbmhaYVp3RlMyNit3VFkyYTJrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkxaaE9QWGozbk55UFVBd2pJSnUwbGZvN1krREZTRWpKblA0bXNwSDlWaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5PYVI2b3BXclhSTDNCWGdaZ09oUDhsT0loOG0ydjNZZHBuTkNtNk9WQmgydmZ3b2pOMnFyMHhoalVIMXVwL2xTRTBJNTZFYTBJa2g0RzZNTjNxMUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiJhaG9wbVBJWDlEMUN4NFZuZnJmQWptTnBiclp5SkpxYmx6cVZzR3hlR0dZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyOTIyNjAwN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCOEZBNDlBRjZFOUMzMTQ1QUZDMjdDMkExQTRFOEFFNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNjEwODUxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJUNFJIVEQ4RiIsIm1lIjp7ImlkIjoiMjU1NjI5MjI2MDA3OjU5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTI3NDcwODcxMzAyMzQ0OjU5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSkdTNWRVQkVNcnJuY01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTlhMSDU1Qzk1RGxNV1ZTWWhlRlAzMGRYSkxmZ1ZPSi9LR1lhcDFiUkRucz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ2hDWEdrcjVNZTdKeDRrZm0xRzJCZzBMUkw1MVJhZ05VR2gwd21kbi9wRjc1Ykc2ZGFFOHcyL3phMjZsYmI5MHVTL0FYSzlLN2UwZVdNMEc0T0U5REE9PSIsImRldmljZVNpZ25hdHVyZSI6InVHYTJtWTlMcjFqa2trcGJQbjNNdzY1UFpscmpnREx6VnpidTVsNU5XNE5GMHQwbEJuN2M3RnBlM3VuVVh6RTcrMytGd3ZGbVVnSGR1RmxPSGJCMERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjI5MjI2MDA3OjU5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRWeXgrZVF2ZVE1VEZsVW1JWGhUOTlIVnlTMzRGVGlmeWhtR3FkVzBRNTcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTYxMDg0MCwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOMDEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "MAJENZI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255629226007",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'NEXUS-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/g86c1n.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
