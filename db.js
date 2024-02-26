import 'dotenv/config'
import postgres from "postgres"

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;
const URL = `postgress://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;
export const sql = postgres(URL, {ssl: 'require'})


