import express from "express";
import * as dotenv from 'dotenv'
dotenv.config()
import client from './pg_client.js';

const app = express()

app.get('/students', async (req,res) => {
    const result = await client.query('SELECT 1+1 AS Result')
    res.json(result)
})

// app.post('/students', (req,res) => res.send('hola cami'))
app.listen(3000)

// 19:00
