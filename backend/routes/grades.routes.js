import { Router } from 'express'
import { getGradesByRut, getGradesBySubjectId, postGrade } from '../controllers/grades.controller.js'

const router = Router()

router.get('/grades/byid/:id_subject/:rut_student', getGradesBySubjectId)
router.get('/grades/byrut/:rut_student', getGradesByRut)
router.post('/grades', postGrade)

export default router
