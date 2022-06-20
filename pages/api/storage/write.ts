import type { NextApiRequest, NextApiResponse } from "next"
import { writeToTable } from "../../../utils/baserowWrapper"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body
    const table = await writeToTable(data)
    res.send('success')
}