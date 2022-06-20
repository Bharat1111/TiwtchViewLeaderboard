import type { NextApiRequest, NextApiResponse } from "next"
import { getTableRows } from "../../../utils/baserowWrapper"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const table = await getTableRows()
    res.send(table)
}