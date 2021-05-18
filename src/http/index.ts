import axios from 'axios'

export const httpGet = async (url: string): Promise<string> => {
    const res = await axios.get(url)
    return res.data
}
