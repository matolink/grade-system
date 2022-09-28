import { Router } from 'express'
import {
  getStudentSubjectById,
  getStudentSubjectByRut,
  getStudentSubjects,
  postStudentSubject,
} from '../controllers/stu_sub.controller.js'

const router = Router()

router.get('/stusub', getStudentSubjects)
router.get('/stusub/byrut/:rut', getStudentSubjectByRut)
router.get('/stusub/byid/:id', getStudentSubjectById)
router.post('/stusub', postStudentSubject)

export default router
