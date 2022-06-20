import { signIn } from "next-auth/react"
import Layout from "../components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <h1>Twitch Leaderboard</h1>
      <p>
        Let's see who's been around go to this site /streamerName to see their stats
      </p>
      <button onClick={() => {
        signIn('twitch')
      }}>Sign In</button>
    </Layout>
  )
}
