import { Router } from 'express'
import { getStudentSubjectByRut, getStudentSubjects, postStudentSubject } from '../controllers/stu_sub.controller.js'

const router = Router()

router.get('/stusub', getStudentSubjects)
router.get('/stusub/:rut', getStudentSubjectByRut)
router.post('/stusub', postStudentSubject)

export default router
