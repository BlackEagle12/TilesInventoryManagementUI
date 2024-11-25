import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'next-themes'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider  attribute="class">
         <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
