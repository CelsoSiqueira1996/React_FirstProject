import "./global.css";
import styles from "./App.module.css";
import { Post, PostType } from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/120414414?v=4",
      name: "Celso Siqueira",
      role: "Web Developer"
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio. O nome do projeto é DoctorCare.' },
      { type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2024-08-07 15:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://avatars.githubusercontent.com/u/120414414?v=4",
      name: "Antônio José",
      role: "Data Cientist"
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifólio. O nome do projeto é DoctorCare.' },
      { type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2024-08-09 11:00:00')
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post 
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>

    </div>
  )
}

