import type { NextApiRequest, NextApiResponse } from "next"
import { addStreamer, getStreamers, updateStreamer } from "../../../utils/baserowWrapper"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const table = await getStreamers()
        res.send(table)
    }

    else if (req.method === "POST") {
        const data = req.body
        await addStreamer(data.name)
        res.send('success')
    }
    else if (req.method === 'PATCH' || req.method === 'PUT') {
        const data = req.body
        await updateStreamer(data.Name, data)
        res.send('success PUT')
    }
}