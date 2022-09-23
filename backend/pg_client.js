import pkg from "pg";
import * as dotenv from 'dotenv'
dotenv.config()

const {Client} = pkg
console.log(process.env)
const client = new Client({
    user:process.env.PGUSER,
    host:process.env.PGHOST,
    database:process.env.PGDATABASE,
    password:process.env.PGPASSWORD,
    port:process.env.PGPORT
})
await client.connect()

export default client
