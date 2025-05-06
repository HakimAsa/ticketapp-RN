const callServerError = (error: any): string => {
  if (typeof error === 'string') return error
  if (error.response && error.response.data) {
    if (typeof error.response.data === 'string') return error.response.data
    return error.response.data.errorMessage || error.response.data.message
  }
  if (error.response?.message) return error.response.message
  return error.message || error.data.message || error.data.errorMessage
}

export default callServerError
