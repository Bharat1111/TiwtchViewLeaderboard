import axios from 'axios'

const BASE_URL = 'https://api.baserow.io'
const API_KEY = process.env.BASEROW_API_KEY
const TABLE_ID = process.env.BASEROW_TABLE_ID
const STREAMERS_TABLE_ID = '74787'
const CHATTERS_TABLE_ID = '74819'

export type Streamer = {
    Name?: string,
    live?: boolean,
}

export type Chatter = {
    Name?: string,
    statsPerStreamer?: string,
}

export const getTableFields = async () => {
    return axios({
        method: "GET",
        url: "https://api.baserow.io/api/database/fields/table/74773/",
        headers: {
            Authorization: `Token ${API_KEY}`,
        }
    }).then(res => res.data)
}

export const getTableRows = async (tableId = TABLE_ID) => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/api/database/rows/table/${tableId}/?user_field_names=true`,
        headers: {
            Authorization: `Token ${API_KEY}`,
        }
    }).then(res => res.data.results)
}

export const writeToTable = async (data: any, tableId = TABLE_ID) => {
    return axios({
        method: "POST",
        url: `${BASE_URL}/api/database/rows/table/${tableId}/?user_field_names=true`,
        headers: {
            Authorization: `Token ${API_KEY}`,
            "Content-Type": "application/json"
        },
        data
    })
}

export const updateToTable = async (data: any, tableId = TABLE_ID) => {
    return axios({
        method: "PATCH",
        url: `${BASE_URL}/api/database/rows/table/${tableId}/{row_id}/?user_field_names=true`,
        headers: {
            Authorization: `Token ${API_KEY}`,
            "Content-Type": "application/json"
        },
        data
    })
}

export const updateRow = async (id: string, newData: any, tableId = TABLE_ID) => {
    return axios({
        method: "PATCH",
        url: `${BASE_URL}/api/database/rows/table/${tableId}/${id}/?user_field_names=true`,
        headers: {
            Authorization: `Token ${API_KEY}`,
            "Content-Type": "application/json"
        },
        data: newData
    })
}

export const getStreamers = async () => {
    return axios({
        method: "GET",
        url: `${BASE_URL}/api/database/rows/table/${STREAMERS_TABLE_ID}/?user_field_names=true`,
        headers: {
            Authorization: `Token ${API_KEY}`,
        }
    }).then(res => res.data.results.map((row: { Name: string }) => row.Name))
}

export const addStreamer = async (name: string) => {
    return writeToTable({
        Name: name
    }, STREAMERS_TABLE_ID)
}

export const getStreamerByName = async (name: string) => {
    const streamerRows = await getTableRows(STREAMERS_TABLE_ID)
    const streamerRow = streamerRows.find((row: Streamer) => row.Name === name)
    const streamerId = streamerRow.id
    if(!streamerId) return null
    return streamerId
}

export const getChatterByName = async (name: string) => {
    const chatterRows = await getTableRows(CHATTERS_TABLE_ID)
    const chatterRow = chatterRows.find((row: Streamer) => row.Name === name)
    const chatterId = chatterRow.id
    if(!chatterId) return null
    return chatterId
}

export const updateStreamer = async (name: string, newData: Streamer) => {
    const streamerId = await getStreamerByName(name)
    return updateRow(streamerId, newData, STREAMERS_TABLE_ID)
}

export const getChatters = async () => {
    return getTableRows(CHATTERS_TABLE_ID)
}

export const updateChatter = async (name: string, newData: Streamer) => {
    const chatterId = await getChatterByName(name)
    return updateRow(chatterId, newData, CHATTERS_TABLE_ID)
}

export const addChatter = async (name: string) => {
    return writeToTable({
        Name: name,
    }, CHATTERS_TABLE_ID)
}