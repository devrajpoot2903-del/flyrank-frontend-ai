import { useState } from 'react'
import './App.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const styles = {
  main: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '24px',
    fontFamily: 'sans-serif',
  },
  title: {
    margin: '0 0 20px',
    fontSize: '24px',
  },
  field: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  error: {
    margin: '6px 0 0',
    fontSize: '13px',
    color: '#dc2626',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed',
  },
  success: {
    margin: '0 0 16px',
    padding: '10px 12px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '4px',
    fontSize: '14px',
  },
}

function validateName(name) {
  if (!name.trim()) {
    return 'Name is required'
  }
  return ''
}

function validateEmail(email) {
  if (!email.trim()) {
    return 'Email is required'
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address'
  }
  return ''
}

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })
  const [successMessage, setSuccessMessage] = useState('')

  const isValid = !validateName(name) && !validateEmail(email)

  const handleNameChange = (event) => {
    setName(event.target.value)
    setErrors((prev) => ({ ...prev, name: '' }))
    setSuccessMessage('')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setErrors((prev) => ({ ...prev, email: '' }))
    setSuccessMessage('')
  }

  const handleNameBlur = () => {
    setErrors((prev) => ({ ...prev, name: validateName(name) }))
  }

  const handleEmailBlur = () => {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nameError = validateName(name)
    const emailError = validateEmail(email)

    setErrors({ name: nameError, email: emailError })

    if (!nameError && !emailError) {
      setSuccessMessage('Settings saved successfully')
    }
  }

  return (
    <main style={styles.main}>
      <form onSubmit={handleSubmit} noValidate>
        <h1 style={styles.title}>Settings</h1>

        {successMessage && (
          <p role="status" style={styles.success}>
            {successMessage}
          </p>
        )}

        <div style={styles.field}>
          <label htmlFor="name" style={styles.label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            style={{
              ...styles.input,
              ...(errors.name ? styles.inputError : {}),
            }}
          />
          {errors.name && (
            <p id="name-error" style={styles.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            style={{
              ...styles.input,
              ...(errors.email ? styles.inputError : {}),
            }}
          />
          {errors.email && (
            <p id="email-error" style={styles.error}>
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            ...styles.button,
            ...(!isValid ? styles.buttonDisabled : {}),
          }}
        >
          Save
        </button>
      </form>
    </main>
  )
}

export default App
