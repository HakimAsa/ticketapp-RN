import { useState } from 'react'
import { ApiResponse } from 'apisauce'

import callServerError from '../utils/callServerError'

type ApiFunction<T, Args extends any[]> = (
  ...args: Args
) => Promise<ApiResponse<T>>

export default function useApi<T, Args extends any[]>(
  apiFunc: ApiFunction<T, Args>
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const request = async (...args: Args) => {
    setLoading(true)
    const response = await apiFunc(...args)
    setLoading(false)

    setError(!response?.ok)
    setData(response?.data ?? null)
    setMessage(
      !response
        ? 'Unauthorized'
        : !response?.ok
        ? callServerError(response)
        : 'An error occured!'
    )

    return response
  }

  return { data, error, loading, message, request, setLoading }
}
