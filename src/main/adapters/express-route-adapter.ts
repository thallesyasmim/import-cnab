import { Gateway } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Gateway) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      file: req?.file
    }

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299)
      return res.status(httpResponse.statusCode).json(httpResponse.body)

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body?.message
    })
  }
}
