import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function ByRut() {
  return (
    <div>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Rut Alumno</Form.Label>
        <Form.Control type='text' placeholder='19430954-2' />
      </Form.Group>{' '}
      <Button variant='primary' type='submit' size='lg'>
        Submit
      </Button>
    </div>
  )
}
