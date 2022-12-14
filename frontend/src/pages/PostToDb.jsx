import Container from 'react-bootstrap/Container'
import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function PostToDb() {
  // const [post, setPost] = useState([])
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/subjects')
  //     .then((res) => res.json())
  //     .then((json) => setSubjects(json))
  // }, [])
  const navigate = useNavigate()
  const handleRadioButtonCheck = (event) => {
    console.log(event.target.id)
    navigate(`/add/${event.target.id}`)
  }
  return (
    <div>
      <Container>
          <br />
          <h1>Sistema de Notas</h1>
          <br />
        <Helmet>
          <title>matolink</title>
        </Helmet>
        <Form>
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className='mb-3'>
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='Agregar Profesor'
                name='group1'
                type={type}
                id={'addteacher'}
              />
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='Agregar Alumno'
                name='group1'
                type={type}
                id={'addstudent'}
              />
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='Añadir Alumno a curso'
                name='group1'
                type={type}
                id={'addstusub'}
              />
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='Añadir Curso'
                name='group1'
                type={type}
                id={'addsubject'}
              />
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='Añadir Nota'
                name='group1'
                type={type}
                id={'addgrade'}
              />
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='Añadir Examen'
                name='group1'
                type={type}
                id={'addexam'}
              />
            </div>
          ))}
        </Form>
        <Outlet />
      </Container>
    </div>
  )
}
