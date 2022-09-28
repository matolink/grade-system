import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
export default function BySubject() {
  const [subjects, setSubjects] = useState([])
  const [values, setValues] = useState({
    id_subject: '',
    rut_student: '',
  })
  const [grades, setGrades] = useState()
  const [students, setStudents] = useState()

  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  // async function request(event) {
  //   event.preventDefault()
  //   await fetch(
  //     `http://localhost:3000/api/grades/byid/${values.id_subject}/${values.rut_student}`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => setGrades(json))
  //   await fetch(
  //     `http://localhost:3000/api/exams/byid/${values.id_subject}/${values.rut_student}`
  //   )
  //     .then((res) => res.json())
  //     .then((json) => setExam(json))
  // let sum = 0
  // grades.map((e) => {
  //   sum = sum + e.grade
  // })
  // let average = sum / grades.length
  // let calcs = {}
  // calcs.average = average
  // if (average < 60) {
  //   calcs.isexam = 'No'
  // } else {
  //   calcs.isexam = 'Si'
  // }
  // calcs.exam = exam[0].grade
  // calcs.final = (calcs.average + calcs.exam)/2
  // console.log(calcs)
  // setShow(true)
  // }
  const handleSubjectIdValue = (event) => {
    setValues({ ...values, id_subject: event.target.value })
  }
  async function request(event) {
    await fetch(
      `http://localhost:3000/api/grades/byid/${values.id_subject}`
    )
      .then((res) => res.json())
      .then((json) => setGrades(json))
  }
  return (
    <div>
      <Form.Label>Curso</Form.Label>
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
      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header onClick={request}>Todos los alumnos</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Nombre</th>
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
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Alumnos aprobados</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Nombre</th>
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
                  {/* {grades.map((element) => ( */}
                  {/*   <td key={element.id}>{element.grade}</td> */}
                  {/* ))} */}
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Alumnos reprobados</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Nombre</th>
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
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
