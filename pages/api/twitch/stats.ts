// https://tmi.twitch.tv/group/user/roxkstar74/chatters

import type { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const streamer = req.query.streamer as string
    const URL = `https://tmi.twitch.tv/group/user/${streamer}/chatters`

    const chatters = await axios.get(URL).then(response => {
        return response.data
    })
    res.send(chatters)
}