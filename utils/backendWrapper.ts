import axios from 'axios'

export const addStreamerFromFrontend = async (name: string) => {
    return axios({
        method: 'POST',
        url: '/api/storage/streamers',
        data: {name}
    }).then(res => res.data)
}

export const checkStreamerExists = async (name: string) => {
    return axios({
        method: 'GET',
        url: `/api/storage/streamers`,
    }).then(res => res.data as string[])
        .then(streamers => streamers.includes(name))
}