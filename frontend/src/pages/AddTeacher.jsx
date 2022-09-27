import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddTeacher() {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Rut Profesor</Form.Label>
        <Form.Control type='text' placeholder='19430954-2' />
      </Form.Group>{' '}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Nombre Profesor</Form.Label>
        <Form.Control type='text' placeholder='Juan Castro' />
      </Form.Group>{' '}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}
