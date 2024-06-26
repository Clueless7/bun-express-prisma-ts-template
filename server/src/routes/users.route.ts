import { Router } from 'express'
import { createUser, getUserById, getUsers } from '../handlers/users.handler'

const router = Router()

router.get('/', getUsers)
router.post('/', createUser)

router.get('/:id', getUserById)

export default router
