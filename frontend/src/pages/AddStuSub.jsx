import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddStuSub() {
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  const [students, setStudents] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/students')
      .then((res) => res.json())
      .then((json) => setStudents(json))
  }, [])
  const [values, setValues] = useState({
    id_subject: '',
  })
  return (
    <div>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Seleccionar Curso</Form.Label>
        <Form.Select defaultValue={0}>
          <option disabled value={0}>
            Selecciona una opcion
          </option>
          {subjects.map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>{' '}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Seleccionar Alumno</Form.Label>
        <Form.Select defaultValue={0}>
          <option disabled value={0}>
            Selecciona una opcion
          </option>
          {students.map((element) => (
            <option key={element.rut} value={element.rut}>
              {element.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>{' '}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </div>
  )
}
