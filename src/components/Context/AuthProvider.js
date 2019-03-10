import React, {useState, useEffect} from 'react'
import AuthContext from './AuthContext'

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(null)

  const updateToken = () => setToken(localStorage.getItem('customerToken'))

  const signOut = () => {
    localStorage.removeItem('customerToken')
    setToken('')
  }

  useEffect(() => {
    const token = localStorage.getItem('customerToken')
    setToken(token)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        updateToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
