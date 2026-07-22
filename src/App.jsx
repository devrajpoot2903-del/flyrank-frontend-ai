import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h1 className="settings-form__title">Settings</h1>

      <div className="settings-form__field">
        <label htmlFor="name" className="settings-form__label">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="settings-form__input"
        />
      </div>

      <div className="settings-form__field">
        <label htmlFor="email" className="settings-form__label">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="settings-form__input"
        />
      </div>

      <button type="submit" className="settings-form__button">
        Save
      </button>
    </form>
  )
}

export default App