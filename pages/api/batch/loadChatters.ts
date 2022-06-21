import type { NextApiRequest, NextApiResponse } from "next"
import { addChatter, Chatter, getChatters } from "../../../utils/baserowWrapper"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const knownChatters = await getChatters() as Chatter[]
    const suppliedChatters = req.body as string[]
    const newChatters = suppliedChatters.filter(chatterName => !knownChatters.some(knownChatter => knownChatter.Name === chatterName))
// console.log(knownChatters.length)
    const newChatterName = newChatters//.map(chatterName => chatterName)
    for (const name of newChatterName) {
        console.log(`Adding chatter ${name}`)
        if(name) await addChatter(name)
    }
    res.send('success')
}