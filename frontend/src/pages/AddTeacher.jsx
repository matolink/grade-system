import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react'

export default function AddTeacher() {
  const [message, setMessage] = useState({})
  const [show, setShow] = useState(false)
  const [values, setValues] = useState({ rut: '', name: '' })
  const handlerRut = (event) => {
    setValues({ ...values, rut: event.target.value })
  }
  const handlerName = (event) => {
    setValues({ ...values, name: event.target.value })
  }
  const request = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/teachers', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rut: values.rut,
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
          <Form.Label>Rut Profesor</Form.Label>
          <Form.Control
            type='text'
            placeholder='19430954-2'
            onChange={handlerRut}
          />
        </Form.Group>{' '}
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Nombre Profesor</Form.Label>
          <Form.Control
            type='text'
            placeholder='Juan Castro'
            onChange={handlerName}
          />
        </Form.Group>{' '}
        <Button variant='primary' type='submit' onClick={request}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
