import { Router } from 'express'
import { getGradesByRut, getGradesBySubjectId, postGrade } from '../controllers/grades.controller.js'

const router = Router()

router.get('/grades/byid/:id', getGradesBySubjectId)
router.get('/grades/byrut/:rut', getGradesByRut)
router.post('/grades', postGrade)

export default router
