import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddSubject() {
  const [teachers, setTeacher] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/teachers')
      .then((res) => res.json())
      .then((json) => setTeacher(json))
  }, [])
  const [values, setValues] = useState({
    id_subject: '',
  })
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Ingrese Nombre del curso</Form.Label>
        <Form.Control type='text' placeholder='ej: Revolucion Francesa' />
      </Form.Group>{' '}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Seleccione profesor a asignar</Form.Label>
        <Form.Select defaultValue={0}>
          <option disabled value={0}>
            Selecciona una opcion
          </option>
          {teachers.map((element) => (
            <option key={element.rut} value={element.rut}>
              {element.name}
              {console.log(values)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>{' '}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}
