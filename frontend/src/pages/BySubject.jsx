import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
export default function BySubject() {
  // select filling

  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])

  const [values, setValues] = useState({
    id_subject: '',
  })

  const handleSubjectIdValue = (event) => {
    setValues({ ...values, id_subject: event.target.value })
    fetch(`http://localhost:3000/api/students/bysub/${event.target.value}`)
      .then((res) => res.json())
      .then((json) => setStudents(json))
  }
  // select filling end

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

  //bring students

  const [students, setStudents] = useState([])

  // end bring students
  const [grades, setGrades] = useState([])
  const [exam, setExam] = useState([])

  function calcsFunction(grades, exam) {
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
    return {
      grades: grades_copy,
      calcs: calcs,
      id_student: grades[0]?.rut_student || 0,
    }
  }

  const [finals, setFinals] = useState([])

let finals_prev = []
  async function request() {
    console.log(finals)
    students.map(async (e) => {
      // finals.name = e.name
      await fetch(
        `http://localhost:3000/api/grades/byid/${values.id_subject}/${e.rut}`
      )
        .then((res) => res.json())
        .then((json) => setGrades(json))
      console.log('fetch1',grades)
      await fetch(
        `http://localhost:3000/api/exams/byid/${values.id_subject}/${e.rut}`
      )
        .then((res) => res.json())
        .then((json) => setExam(json))
      console.log('fetch2',grades)

      finals_prev.push({ grades: calcsFunction(grades, exam), name: e.name })
    console.log(finals)
    })
    setFinals(finals_prev)
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
          <Accordion.Header onClick={request}>
            Todos los alumnos
          </Accordion.Header>
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
                {finals.map((element) => (
                  <tr>
                    <td>{element.name}</td>
                    {element.grades.grades.map((gra) => (
                      <td>{gra.grade}</td>
                    ))}
                    <td>
                      {element.grades.calcs
                        ? element.grades.calcs.average
                        : null}
                    </td>
                    <td>
                      {element.grades.calcs
                        ? element.grades.calcs.isexam
                        : null}
                    </td>
                    <td>
                      {element.grades.calcs ? element.grades.calcs.exam : null}
                    </td>
                    <td>
                      {element.grades.calcs ? element.grades.calcs.final : null}
                    </td>
                  </tr>
                ))}
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
