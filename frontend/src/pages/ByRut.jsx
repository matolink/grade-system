import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default function ByRut() {
  const [show, setShow] = useState(false)
  const [grades, setGrades] = useState([])
  const [exam, setExam] = useState([])
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  const [values, setValues] = useState({
    id_subject: '',
    rut_student: '',
  })
  const handleSubjectIdValue = (event) => {
    setValues({ ...values, id_subject: event.target.value })
  }
  const handleStudentRut = (event) => {
    setValues({ ...values, rut_student: event.target.value })
  }
  async function request(event) {
    event.preventDefault()
    await fetch(
      `http://localhost:3000/api/grades/byid/${values.id_subject}/${values.rut_student}`
    )
      .then((res) => res.json())
      .then((json) => setGrades(json))
    await fetch(
      `http://localhost:3000/api/exams/byid/${values.id_subject}/${values.rut_student}`
    )
      .then((res) => res.json())
      .then((json) => setExam(json))
    setShow(true)
  }
  let grades_copy = [...grades]
  let sum = 0
  grades.map((e) => {
    sum = sum + (e.grade || 0)
  })
  let average = sum / grades.length
  let calcs = {}
  calcs.average = average
  if (average > 60) {
    calcs.isexam = 'No'
  } else {
    calcs.isexam = 'Si'
  }
  calcs.exam = exam[0]?.grade || 0
  calcs.final = (calcs.average + calcs.exam) / 2
  while (grades_copy.length < 4) {
    grades_copy.push({})
  }
  return (
    <div>
      <Form.Label>Curso</Form.Label>
      <Form.Label>111111111-1</Form.Label>
      <Form.Select onChange={handleSubjectIdValue} defaultValue={0}>
        <option disabled value={0}>
          Selecciona una opcion
        </option>
        {subjects.map((element) => (
          <option key={element.id} value={element.id}>
            {element.name}
          </option>
        ))}
      </Form.Select>
      <br />
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Rut Alumno</Form.Label>
        <Form.Control
          type='text'
          placeholder='19430954-2'
          onChange={handleStudentRut}
        />
      </Form.Group>{' '}
      <Button variant='primary' type='submit' size='lg' onClick={request}>
        Submit
      </Button>
      {show ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Nota 4</th>
              <th>Promedio parcial</th>
              <th>Examen?</th>
              <th>Nota Examen</th>
              <th>Promedio final</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {grades_copy.map((element) => (
                <td key={element.id}>{element.grade}</td>
              ))}
              <td>{calcs ? calcs.average : null}</td>
              <td>{calcs ? calcs.isexam : null}</td>
              <td>{calcs ? calcs.exam : null}</td>
              <td>{calcs ? calcs.final : null}</td>
              {/* {calcs.map((element)=>( */}
              {/*  <td key={element.id}>{element.average}</td> */}
              {/* ))} */}
              {/* {calcs.map((element)=>( */}
              {/*  <td key={element.id}>{element.isexam}</td> */}
              {/* ))} */}
              {/* {calcs.map((element)=>( */}
              {/*  <td key={element.id}>{element.exam}</td> */}
              {/* ))} */}
              {/* {calcs.map((element)=>( */}
              {/*  <td key={element.id}>{element.final}</td> */}
              {/* ))} */}
            </tr>
          </tbody>
        </Table>
      ) : null}
    </div>
  )
}
