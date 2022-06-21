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

export const getChattersFromTwitch = async (streamer: string) => {
    return axios({
        method: 'GET',
        url: `/api/twitch/stats?streamer=${streamer}`,
    }).then(res => res.data)
}

export const AddNewChatters = async (streamer: string, chatters: string[]) => {
    return axios({
        method: 'POST',
        url: '/api/batch/loadChatters',
        data: chatters
    })
}