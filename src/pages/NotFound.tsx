import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <section>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <button onClick={() => navigate(-1)}>Go back</button>
        {' '}
        <Link to="/">Go home</Link>
      </p>
    </section>
  )
}
