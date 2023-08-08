import { headers } from 'next/headers'
const hubspot = require('@hubspot/api-client')

export async function POST(request) {
  const body = await request.json()
  const headersList = headers()
  const referer = headersList.get('referer')
  const pageUri = 'https://vbs-mu.vercel.app/'

  const properties = {
    email: body.email,
    website: pageUri,
  }
  const SimplePublicObjectInputForCreate = { properties, associations: [] }

  try {
    // It will be changed with VBS hubspot account token.
    const hubspotClient = new hubspot.Client({
      accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    })
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
      SimplePublicObjectInputForCreate,
    )
    console.log(JSON.stringify(apiResponse, null, 2))
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
  return new Response(
    JSON.stringify({ message: 'Contact created successfully' }),
    {
      status: 200,
      headers: { referer: referer },
    },
  )
}
