import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

import {
  AddNewChatters,
  addStreamerFromFrontend,
  checkStreamerExists,
  getChattersFromTwitch,
} from "../utils/backendWrapper"

const StreamerPage = () => {
  const router = useRouter()
  const { streamer } = router.query
  const [streamerExists, setStreamerExists] = useState(false)

  useEffect(() => {
    if (streamer) {
      checkStreamerExists(streamer as string).then((exists) => {
        // console.log(`Streamer ${streamer} exists: ${exists}`)
        setStreamerExists(exists)
      })
    }
  }, [streamer])

  useEffect(() => {
    if (streamerExists) {
      getChattersFromTwitch(streamer as string).then(data => {
        let chatters = data.chatters.viewers
        console.log(chatters)
        AddNewChatters(streamer as string, chatters)
      })
    }
  }, [streamerExists])

  return (
    <div className="w-screen h-screen gap-5 flex flex-col items-center justify-center bg-[#171A21] text-white">
      <h1>{streamer}'s Viewer Leaderboard</h1>
      {!streamerExists && (
        <div className="flex flex-col">
          <span>
            Streamer not found. Click below to add this streamer to future
          </span>
          tracking.
          <button
            className="text-[#92BCEA]"
            onClick={() => {
              addStreamerFromFrontend(streamer as string)
            }}
          >
            Add {streamer}
          </button>
        </div>
      )}

      {streamerExists && <p>Let's see who's been around</p>}
    </div>
  )
}

export default StreamerPage
