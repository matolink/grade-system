import { Router } from 'express'
import { getAllExams, getExamsBySubjectId, postExam } from '../controllers/exams.controller.js'

const router = Router()

router.get('/exams/byid/:id_subject/:rut_student', getExamsBySubjectId)
router.get('/exams', getAllExams)
router.post('/exams', postExam)

export default router
