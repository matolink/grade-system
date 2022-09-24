import { Router } from 'express'
import { createTables } from '../controllers/database.controller.js'

const router = Router()

router.post('/createtables', createTables)

export default router
