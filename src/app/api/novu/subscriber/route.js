import { NextResponse } from 'next/server'
import { Novu } from '@novu/node'

const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API_KEY)

export async function POST(request) {
  const { userId, userEmail, userName } = await request.json()

  try {
    await novu.subscribers
      .identify(userId, {
        email: userEmail,
        firstName: userName,
      })
      .catch((err) => {
        console.log('in catch: ', err)
        return NextResponse.json({ status: 'Error', err })
      })
  } catch (error) {
    console.error('error::', error)
    return NextResponse.json({ status: 'error', error })
  }
}
