import '../App.css'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section>
      <h1>About Sansa</h1>
      <p>This demo app shows a minimal router setup with a few pages.</p>

      <div className="card">
        <p>
          Built with Vite + React + react-router-dom. You can persist state, navigate
          between pages, and extend routes easily.
        </p>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </section>
  )
}
