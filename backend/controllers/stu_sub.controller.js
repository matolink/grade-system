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
      return
    } else {
      res.json(result.rows)
    }
    return
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
    return
  }
}

export const getStudentSubjectById = async (req, res) => {
  let text = 'SELECT * FROM student_subject WHERE id_subject = $1'
  let value = [req.params.id]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'student_subject not found',
      })
      return
    } else {
      res.json(result.rows)
    }
    return
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
    return
  }
}

export const postStudentSubject = async (req, res) => {
  let textCheck = 'SELECT * FROM student_subject WHERE rut_student = $1'
  let valuesCheck = [req.body.rut_student]
  try {
    let query = await client.query(textCheck, valuesCheck)
    if (query.rows.length >= 3) {
      res.status(400)
      res.json({
        message: 'student has already registered 3 subjects',
        variant: 'warning',
      })
      return
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
      variant: 'danger',
    })
    return
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
        variant: 'warning',
      })
      return
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
      variant: 'danger',
    })
    return
  }
  let text =
    'INSERT INTO student_subject(rut_student, id_subject) VALUES($1, $2) RETURNING *'
  let values = [req.body.rut_student, req.body.id_subject]
  if (req.body.rut_student.length <= 9) {
    res.status(400)
    res.json({
      message: 'too few characters to enter, try again',
      variant: 'danger',
    })
    return
  }
  try {
    try {
      let query = await client.query(text, values)
      res.json({
        message: 'posted successfuly',
        variant: 'success',
        id_subject: query.rows[0].id_subject,
        rut_student: query.rows[0].rut_student,
      })
    } catch (err) {
      console.log(err.stack)
      res.status(400)
      res.json({
        message: 'Something got wrong with the query (Maybe it is already added), try again',
        variant: 'danger',
      })
      return
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
    return
  }
}
