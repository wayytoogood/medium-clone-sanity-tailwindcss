// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'
import { FormInputs } from '../../typings'

export default async function generateComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, message } = JSON.parse(req.body) as FormInputs

  try {
    const commentConfig = {
      _type: 'comment',
      name,
      email,
      message,
      // normalde yukardaki gibi direk alanın değerini girmemiz yeterli oluyor fakat reference field'ıysa aşağıdaki gibi belirtmemiz gerekiyor.
      // verilen id'ye sahip post seçiliyor.
      post: {
        _type: 'reference',
        _ref: _id,
      },
    }

    await sanityClient.create(commentConfig)
  } catch (error) {
    res.status(500).json({ message: `Couldn't submit comment`, error })
  }

  res.status(200).json({ message: 'Comment submitted' })
}
