import type { User } from '@prisma/client'
import type { NextFunction } from 'express'
import type { Request, Response } from 'express-serve-static-core'
import { prisma } from '../db'
import { CreateUserSchema } from '../dtos/CreateUser.dto'
import type { ErrorMessage } from '../types/ErrorMessageType'
import bcrypt from 'bcrypt'

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await prisma.user.findMany().catch(next)
  return res.status(200).json(users)
}

export const createUser = async (
  req: Request,
  res: Response<User | ErrorMessage>,
  next: NextFunction
) => {
  const input = CreateUserSchema.safeParse(req.body)

  if (!input.success) {
    return res.status(400).json({ message: input.error.errors })
  }

  const user = await prisma.user
    .create({
      data: {
        username: input.data.username,
        email: input.data.email,
        password: await bcrypt.hash(input.data.password, 10),
      },
    })
    .catch(next)

  if (!user) {
    return res.status(409).json({ message: 'User already exists' })
  }

  return res.status(201).json(user)
}

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response<User | ErrorMessage>,
  next: NextFunction
) => {
  const user = await prisma.user
    .findUnique({
      where: {
        id: req.params.id,
      },
    })
    .catch(next)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(200).json(user)
}

// TODO: exclude password from response
// TODO: implement logger
// TODO: implement security middleware
// TODO: implement auth middleware
// TODO: implement rate limiter
// TODO: implement testing
// TODO: implement swaggerUI
