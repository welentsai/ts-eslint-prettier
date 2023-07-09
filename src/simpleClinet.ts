import axios from 'axios'

const defaultBaseUrl = 'http://your-api.example.com'

interface ServerResponse {
  status: string
}

export const api = (baseUrl = defaultBaseUrl) => ({
  getHealth: () => axios.get<ServerResponse>(`${baseUrl}/health`).then((response) => response.data.status),
  /* other endpoints here */
})
