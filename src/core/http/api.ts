import { handleError } from './errors'

export const apiUrl = process.env.API_URL

export const fetchGet = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'GET',
      ...options,
    })

    const responseData = (await response.json()) as T & object

    if ('error' in responseData || !response.ok) {
      throw handleError(responseData)
    }

    return responseData
  } catch (error) {
    throw handleError(error)
  }
}

export const fetchPost = async <T>(
  url: string,
  data: any,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    })
    const responseData = (await response.json()) as T & object

    if ('error' in responseData || !response.ok) {
      throw handleError(responseData)
    }

    return responseData
  } catch (error) {
    throw handleError(error)
  }
}

export const fetchPut = async <T>(
  url: string,
  data: any,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    })
    const responseData = (await response.json()) as T & object

    if ('error' in responseData || !response.ok) {
      throw handleError(responseData)
    }

    return responseData
  } catch (error) {
    throw handleError(error)
  }
}

export const fetchDelete = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'DELETE',
      ...options,
    })
    const responseData = (await response.json()) as T & object

    if ('error' in responseData || !response.ok) {
      throw handleError(responseData)
    }

    return responseData
  } catch (error) {
    throw handleError(error)
  }
}
