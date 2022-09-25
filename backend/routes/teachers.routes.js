import { Router } from 'express'
import {getTeachers, postTeacher, getTeacher} from '../controllers/teachers.controller.js'

const router = Router()

router.get('/teachers', getTeachers)
router.get('/teachers/:rut', getTeacher)
router.post('/teachers', postTeacher)

export default router
