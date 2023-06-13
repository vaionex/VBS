import axios from 'axios'

export async function CreateNovuSubscriber(userId, userEmail, userName) {
  try {
    const response = await axios.post('/api/novu/subscriber', {
      userId,
      userEmail,
      userName,
    })
    console.log(response.data)
  } catch (err) {
    console.error('error::', err)
  }
}

export async function SendNotification(userId, message) {
  try {
    const response = await axios.post('/api/novu/notification', {
      userId,
      message,
    })
    console.log('send -->', response.data)
  } catch (err) {
    console.error('2::', err)
  }
}