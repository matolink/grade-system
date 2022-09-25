import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import studentsRoutes from './routes/students.routes.js'
import databaseRoutes from './routes/database.routes.js'
import teachersRoutes from './routes/teachers.routes.js'
import subjectsRoutes from './routes/subjects.routes.js'
import stuSubRoutes from './routes/stu_sub.routes.js'
import gradesRoutes from './routes/grades.routes.js'

const app = express()
app.use(express.json())

app.use('/api',studentsRoutes)
app.use('/api',databaseRoutes)
app.use('/api',teachersRoutes)
app.use('/api',subjectsRoutes)
app.use('/api',stuSubRoutes)
app.use('/api',gradesRoutes)
app.use((req,res,next) => {
    res.status(404)
    res.json({
        message: 'endpoint not found'
    })
})

app.listen(3000)
