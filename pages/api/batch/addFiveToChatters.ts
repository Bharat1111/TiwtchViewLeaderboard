import type { NextApiRequest, NextApiResponse } from "next"
import { addChatter, Chatter, getChatters, updateChatter } from "../../../utils/baserowWrapper"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const knownChatters = await getChatters() as Chatter[]

    const suppliedChatters = req.body.chatters as string[]
    const streamer = req.body.streamer as string

    for (const name of suppliedChatters) {
        if (name) {
            const knownChatter = knownChatters.find(knownChatter => knownChatter.Name === name)
            if (knownChatter) {
                console.log(`Updating chatter ${name}`)
                let knownChatterStats = knownChatter.statsPerStreamer as string
                let statsJson = JSON.parse(knownChatterStats) || {}

                let statsForThisStreamer = statsJson[streamer]

                if (!statsForThisStreamer) {
                    statsJson[streamer] = {
                        watchTime: 5,
                    }
                } else {
                    statsForThisStreamer.watchTime += 5
                    statsJson[streamer] = statsForThisStreamer
                }
                const newStats = JSON.stringify(statsJson)
                const success = await updateChatter(name, { statsPerStreamer: newStats })
            }
        }
    }
    res.send('success')
}