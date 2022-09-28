import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import studentsRoutes from './routes/students.routes.js'
import databaseRoutes from './routes/database.routes.js'
import teachersRoutes from './routes/teachers.routes.js'
import subjectsRoutes from './routes/subjects.routes.js'
import stuSubRoutes from './routes/stu_sub.routes.js'
import gradesRoutes from './routes/grades.routes.js'
import examsRoutes from './routes/exams.routes.js'

const app = express()
app.use(express.json())

app.use(cors())
app.use('/api',studentsRoutes)
app.use('/api',databaseRoutes)
app.use('/api',teachersRoutes)
app.use('/api',subjectsRoutes)
app.use('/api',stuSubRoutes)
app.use('/api',gradesRoutes)
app.use('/api',examsRoutes)
app.use((req,res,next) => {
    res.status(404)
    res.json({
        message: 'endpoint not found'
    })
})

app.listen(3000)
