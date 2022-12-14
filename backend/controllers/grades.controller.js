import client from '../pg_client.js'

export const getGradesBySubjectId = async (req, res) => {
  let text = 'SELECT * FROM grade WHERE id_subject = $1 AND rut_student = $2 AND exam IS false'
  let value = [req.params.id_subject,req.params.rut_student]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'student not found',
        variant: 'warning',
      })
    } else {
      res.json(result.rows)
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
      variant: 'danger',
    })
  }
}

export const getGradesByRut = async (req, res) => {
  let text = 'SELECT * FROM grade WHERE rut_student = $1'
  let value = [req.params.rut_student]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'student not found',
        variant: 'danger',
      })
    } else {
      res.json(result.rows)
    }
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
      variant: 'danger',
    })
  }
}

export const postGrade = async (req, res) => {
  // chequear validez de nota ingresada
  if (req.body.grade < 10) {
    req.body.grade = req.body.grade * 10
  }
  if (req.body.grade >= 71 || req.body.grade < 10) {
    res.status(400)
    res.json({
      message: 'the grade is invalid',
      variant: 'danger',
    })
    return
  }

  // chequear cantidad de notas
  let textCheck =
    'SELECT * FROM grade WHERE rut_student = $1 AND id_subject = $2 AND exam = false'
  let valueCheck = [req.body.rut_student, req.body.id_subject]
  try {
    let query = await client.query(textCheck, valueCheck)
    if (query.rows.length >= 4) {
      res.status(400)
      res.json({
        message: 'student already has 4 notes in this subject',
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
  // chequear cantidad de examenes en el ramo
  let examText =
    'SELECT * FROM grade WHERE rut_student = $1 AND id_subject = $2 AND exam = true'
  let examValue = [req.body.rut_student, req.body.id_subject]
  try {
    let query = await client.query(examText, examValue)
    if (query.rows.length >= 1) {
      res.status(400)
      res.json({
        message: 'student already has an exam registered in this subject',
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
    'INSERT INTO grade(rut_student, id_subject, grade, exam) VALUES($1, $2, $3, $4) RETURNING *'
  let values = [
    req.body.rut_student,
    req.body.id_subject,
    req.body.grade,
    req.body.exam,
  ]
  try {
    let query = await client.query(text, values)
    res.json({
      message: 'Grade added correctly',
      variant: 'success',
      rut_student: query.rows[0].rut_student,
      id_subject: query.rows[0].id_subject,
      grade: query.rows[0].grade,
      exam: query.rows[0].exam,
    })
    return
  } catch (err) {
    console.log(err.stack)
    res.status(400)
    res.json({
      message: 'Something got wrong with the query, try again',
      variant: 'danger',
    })
    return
  }
}
