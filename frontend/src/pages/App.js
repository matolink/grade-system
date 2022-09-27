import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import NoPage from './NoPage.jsx'
import PostToDb from './PostToDb.jsx'
import './App.css'
import ByRut from './ByRut.jsx'
import BySubject from './BySubject.jsx'
import AddTeacher from './AddTeacher.jsx'
import AddStudent from './AddStudent.jsx'
import AddStuSub from './AddStuSub.jsx'
import AddSubject from './AddSubject.jsx'
import AddGrade from './AddGrade.jsx'
import AddExam from './AddExam.jsx'
// en el app deberia poner el componente de ruteo
// acá defino qué componente renderear según la ruta en la que estoy navegando

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='byrut' element={<ByRut />} />
          <Route path='bysubject' element={<BySubject />} />
        </Route>
        <Route path='/add' element={<PostToDb />}>
          <Route path='addteacher' element={<AddTeacher />} />
          <Route path='addstudent' element={<AddStudent />} />
          <Route path='addstusub' element={<AddStuSub />} />
          <Route path='addsubject' element={<AddSubject />} />
          <Route path='addgrade' element={<AddGrade />} />
          <Route path='addexam' element={<AddExam />} />
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
