import { Router } from 'express'
import {getStudents, postStudent, getStudent, getStudentBySub} from '../controllers/students.controller.js'

const router = Router()

router.get('/students', getStudents)
router.get('/students/bysub/:id_sub', getStudentBySub)
router.get('/students/:rut', getStudent)
router.post('/students', postStudent)

export default router
