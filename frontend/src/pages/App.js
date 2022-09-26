import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import NoPage from './NoPage.jsx'
import './App.css'
// en el app deberia poner el componente de ruteo
// acá defino qué componente renderear según la ruta en la que estoy navegando

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
