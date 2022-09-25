import client from '../pg_client.js'

export const getStudentSubjects = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM student_subject')
    res.json(result.rows)
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
}

export const getStudentSubjectByRut = async (req, res) => {
  let text = 'SELECT * FROM student_subject WHERE rut_student = $1'
  let value = [req.params.rut]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'student_subject not found',
      })
    } else {
      res.json(result.rows)
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
}

export const postStudentSubject = async (req, res) => {
  // chequear cantidad de ramos por alumno
  let textCheck = 'SELECT * FROM student_subject WHERE rut_student = $1'
  let valuesCheck = [req.body.rut_student]
  try {
    let query = await client.query(textCheck, valuesCheck)
    if (query.rows.length >= 3) {
      res.status(404)
      res.json({
        message: 'student has already registered 3 subjects',
      })
      return
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
  // chequear cantidad de alumnos por ramo
  let textCheckSub = 'SELECT * FROM student_subject WHERE id_subject = $1'
  let valuesCheckSub = [req.body.id_subject]
  try {
    let query = await client.query(textCheckSub, valuesCheckSub)
    if (query.rows.length >= 5) {
      res.status(404)
      res.json({
        message: 'subject has already registered 5 students',
      })
      return
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
  let text =
    'INSERT INTO student_subject(rut_student, id_subject) VALUES($1, $2) RETURNING *'
  let values = [req.body.rut_student, req.body.id_subject]
  try {
    try {
      let query = await client.query(text, values)
      res.json({
        message: 'postsuccess',
        id_subject: query.rows[0].id_subject,
        rut_student: query.rows[0].rut_student,
      })
    } catch (err) {
      console.log(err.stack)
      res.status(400)
      res.json({
        message: 'Something got wrong with the query, try again',
      })
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
}
