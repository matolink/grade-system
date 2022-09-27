import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
export default function AddSubject() {
  const [message, setMessage] = useState({})
  const [show, setShow] = useState(false)
  const [teachers, setTeacher] = useState([])
  const [values, setValues] = useState({
    id_subject: '',
    rut_teacher: '',
  })
  const handlerRutTeacher = (event) => {
    setValues({ ...values, rut_teacher: event.target.value })
  }
  const handlerName = (event) => {
    setValues({ ...values, name: event.target.value })
  }
  useEffect(() => {
    fetch('http://localhost:3000/api/teachers')
      .then((res) => res.json())
      .then((json) => setTeacher(json))
  }, [])
  const request = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/subjects', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_teacher: values.rut_teacher,
        name: values.name,
      }),
    })
      .then((res) => res.json())
      .then((json) => setMessage(json))
    setShow(true)
  }
  return (
    <div>
      {show ? (
        <Alert variant={message.variant}>
          <Alert.Heading>{message.message}</Alert.Heading>
        </Alert>
      ) : null}
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Ingrese Nombre del curso</Form.Label>
          <Form.Control
            type='text'
            placeholder='ej: Revolucion Francesa'
            onChange={handlerName}
          />
        </Form.Group>{' '}
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Seleccione profesor a asignar</Form.Label>
          <Form.Select defaultValue={0} onChange={handlerRutTeacher}>
            <option disabled value={0}>
              Selecciona una opcion
            </option>
            {teachers.map((element) => (
              <option key={element.rut} value={element.rut}>
                {element.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>{' '}
        <Button variant='primary' type='submit' onClick={request}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
