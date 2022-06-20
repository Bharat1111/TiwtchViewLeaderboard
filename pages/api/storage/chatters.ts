import type { NextApiRequest, NextApiResponse } from "next"
import { addChatter, getChatters, updateChatter } from "../../../utils/baserowWrapper"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const table = await getChatters()
        res.send(table)
    }

    else if (req.method === "POST") {
        const data = req.body
        console.log(data)
        await addChatter(data.name)
        res.send('success')
    }
    else if (req.method === 'PATCH' || req.method === 'PUT') {
        const data = req.body
        await updateChatter(data.Name, data)
        res.send('success PUT')
    }
}