export default httpClient => ({
  register: async ({ name, email, password }) => {
    const response = await httpClient.post('/auth/register', {
      name, email, password
    })
    let errors = null
    console.log('Data: ', response)
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  },

  login: async ({ email, password }) => {
    console.log('Dados: ', { email, password })
    const response = await httpClient.post('/auth/login', { email, password })
    let errors = null
    console.log('Data: ', response)
    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }

    return {
      data: response.data,
      errors
    }
  }
})
