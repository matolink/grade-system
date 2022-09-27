import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddExam() {
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  const [values, setValues] = useState({
    id_subject: '',
  })
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Seleccionar Curso a agregar Examen</Form.Label>
        <Form.Select defaultValue={0}>
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
      </Form.Group>{' '}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Seleccionar Alumno a agregar Examen</Form.Label>
        <Form.Select defaultValue={0}>
          <option disabled value={0}>
            Selecciona una opcion
          </option>
        </Form.Select>
      </Form.Group>{' '}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label >Nota</Form.Label>
        <Form.Control
          type='number'
          id='grade'
        max='70'
        min='10'
        />
      </Form.Group>{' '}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}
