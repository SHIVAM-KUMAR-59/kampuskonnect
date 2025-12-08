import { Router } from 'express'
import studentRegisterController from '../controllers/auth/studentRegister.controller.js'
import reqBodyMiddleware from '../middleware/reqBody.middleware.js'

const router = Router()

router.post('/student/register', reqBodyMiddleware, studentRegisterController)

export default router