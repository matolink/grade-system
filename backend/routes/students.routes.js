import { Router } from 'express'
import {getStudents, postStudents, getStudent} from '../controllers/students.controller.js'

const router = Router()

router.get('/students', getStudents)
router.get('/students/:rut', getStudent)
router.post('/students', postStudents)

export default router
