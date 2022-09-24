import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import studentsRoutes from './routes/students.routes.js'
import databaseRoutes from './routes/database.routes.js'

const app = express()
app.use(express.json())

app.use('/api',studentsRoutes)
app.use('/api',databaseRoutes)
app.use((req,res,next) => {
    res.status(404)
    res.json({
        message: 'endpoint not found'
    })
})

app.listen(3000)
