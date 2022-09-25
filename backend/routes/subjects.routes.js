import { Router } from 'express'
import {getSubjects, postSubject, getSubject} from '../controllers/subjects.controller.js'

const router = Router()

router.get('/subjects', getSubjects)
router.get('/subjects/:id', getSubject)
router.post('/subjects', postSubject)

export default router
