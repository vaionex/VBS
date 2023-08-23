import axios from 'axios'

export async function POST(request) {
  const body = await request.json()
  const referer = request.headers.get('referer')

  const formFields = {
    fields: [
      {
        name: 'firstname',
        value: body.lastName,
      },
      {
        name: 'lastname',
        value: body.firstName,
      },
      {
        name: 'email',
        value: body.email,
      },
      {
        name: 'phoneNumber',
        value: body.phoneNumber,
      },
      {
        name: 'message',
        value: body.message,
      },
    ],
    context: {
      pageUri: 'https://vbs-mu.vercel.app/',
    },
  }

  try {
    const response = await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_SUBS_PORTAL_ID}/${process.env.HUBSPOT_SUBS_FORM_GUID}`,
      formFields,
    )
    console.log('API Response:', JSON.stringify(response.data, null, 2))
  } catch (e) {
    console.error(
      'API Error:',
      e.response ? JSON.stringify(e.response.data, null, 2) : e.message,
    )
  }

  return new Response(
    JSON.stringify({ message: 'Form submitted successfully' }),
    {
      status: 200,
      headers: { referer: referer },
    },
  )
}
