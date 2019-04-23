import { Request, Response, Router } from 'express'

const router = Router()

const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }]

router.get('/users', (_: Request, res: Response) => {
  res.json(users)
})

router.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
