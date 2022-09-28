import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddStuSub() {
  const [message, setMessage] = useState({})
  const [show, setShow] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])


  useEffect(() => {
    fetch('http://localhost:3000/api/students')
      .then((res) => res.json())
      .then((json) => setStudents(json))
  }, [])

  const [values, setValues] = useState({
    id_subject: '',
    rut_student: '',
  })

  const handlerRutStudent = (event) => {
    setValues({ ...values, rut_student: event.target.value })
  }

  const handlerIdSubject = (event) => {
    setValues({ ...values, id_subject: event.target.value })
  }

  const request = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/stusub', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_student: values.rut_student,
        id_subject: values.id_subject,
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
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Seleccionar Curso</Form.Label>
        <Form.Select defaultValue={0} onChange={handlerIdSubject}>
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
        <Form.Select defaultValue={0} onChange={handlerRutStudent}>
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
      <Button variant='primary' type='submit' onClick={request}>
        Submit
      </Button>
    </div>
  )
}
