import { Outlet, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

export default function Layout() {
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  const [values, setValues] = useState({
    id_subject: '',
  })
  const handleSubjectIdValue = (event) => {
    setValues({ ...values, id_subject: event.target.value })
        console.log(values)
  }
  return (
    <div>
      <Helmet>
        <title>matolink</title>
      </Helmet>
      <div className='container align-items-centered'>
        <br />
        <h1>Sistema de Notas</h1>
        <br />
        <Form>
          <Form.Select onChange={handleSubjectIdValue} defaultValue={0}>
            <option disabled value={0}>
              Selecciona una opcion
            </option>
            {subjects.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
                {console.log(values)}
              </option>
            ))}
          </Form.Select>
          <br />
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className='mb-3'>
              <Form.Check
                inline
                label='por RUT'
                name='group1'
                type={type}
                id={`inline-${type}-1`}
              />
              <Form.Check
                inline
                label='por Curso Entero'
                name='group1'
                type={type}
                id={`inline-${type}-2`}
              />
            </div>
          ))}
          <Button variant='primary' type='submit' size='lg'>
            Submit
          </Button>
        </Form>
      </div>
      <Outlet />
    </div>
  )
}
