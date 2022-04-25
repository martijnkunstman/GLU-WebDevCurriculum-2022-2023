import Head from 'next/head'
import Image from 'next/image'
import Planning from '../components/Planning'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default function Home() {
  const { data, error } = useSWR('/api/planningConfig', fetcher)
  if (error) return <div>Failed to planningConfig</div>
  if (data) {
    //console.log(data);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>GLU-WebDevCurriculum-2022-2023</title>
        <meta name="description" content="Curriculum builder in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <Planning config={data}/>
        </DndProvider>
      </main>
    </div>
  )
}
