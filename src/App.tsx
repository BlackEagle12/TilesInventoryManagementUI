import { Toaster } from './components/ui/toaster'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './route'
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { ThemeProvider } from 'next-themes';

function App() {

  return (
    <>
    <Provider store={store}>
      <ThemeProvider  attribute="class">
        <RouterProvider router={createRouter()} />
        <Toaster />
      </ThemeProvider>
    </Provider>
    </>
  )
}

export default App
