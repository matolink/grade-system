import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddGrade() {
  const [message, setMessage] = useState({})
  const [show, setShow] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [students, setStudents] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  const [values, setValues] = useState({
    id_subject: '',
    rut_student: '',
    grade: '',
  })
  useEffect(() => {
    try {
      students.map((element) => {
        fetch(`http://localhost:3000/api/students/${element.rut_student}`)
          .then((res) => res.json())
          .then((json) => {
            element.name = json[0].name
          })
      })
    } catch (error) {
      message.show = true
      message.variant = 'danger'
      message.message = 'la asignatura no tiene ningún alumno'
      setShow(true)
    }
  }, [students])
  const handlerRutStudent = (event) => {
    setValues({ ...values, rut_student: event.target.value })
  }
  const handlerIdSubject = (event) => {
    setValues({ ...values, id_subject: event.target.value })
    try {
      fetch(`http://localhost:3000/api/stusub/byid/${event.target.value}`)
        .then((res) => res.json())
        .then((json) => setStudents(json))
    } catch (error) {
      message.show = true
      message.variant = 'danger'
      message.message = 'la asignatura no tiene ningún alumno'
      setShow(true)
    }
  }
  const handlerGrade = (event) => {
    setValues({ ...values, grade: event.target.value })
  }
  const request = (event) => {
    event.preventDefault()
    console.log(JSON.stringify(values))
    fetch('http://localhost:3000/api/grades', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut_student: values.rut_student,
        id_subject: values.id_subject,
        grade: values.grade,
        exam: false,
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
        <Form.Group className='mb-3'>
          <Form.Label>Seleccionar Curso a agregar Nota</Form.Label>
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
        <Form.Group className='mb-3'>
          <Form.Label>Seleccionar Alumno a agregar Nota</Form.Label>
          <Form.Select defaultValue={0} onChange={handlerRutStudent}>
            <option disabled value={0}>
              Selecciona una opcion
            </option>
            {students.map((element) => (
              <option key={element.rut_student} value={element.rut_student}>
                {element.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>{' '}
        <Form.Group className='mb-3'>
          <Form.Label>Nota</Form.Label>
          <Form.Control
            type='number'
            id='grade'
            max='70'
            min='10'
            onChange={handlerGrade}
          />
        </Form.Group>{' '}
        <Button variant='primary' type='submit' onClick={request}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
