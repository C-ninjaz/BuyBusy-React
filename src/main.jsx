import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { ProductsProvider } from './contexts/ProductsContext'
import store from './store/store'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
)
