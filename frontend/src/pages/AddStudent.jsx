import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function AddStudent(){
    return(
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Rut Alumno</Form.Label>
        <Form.Control type='text' placeholder='19430954-2' />
      </Form.Group>{' '}
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Nombre Alumno</Form.Label>
        <Form.Control type='text' placeholder='Juan Castro' />
      </Form.Group>{' '}
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}
