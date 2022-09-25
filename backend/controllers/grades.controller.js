import client from '../pg_client.js'

export const getGradesBySubjectId = async (req, res) => {
  let text = 'SELECT * FROM grade WHERE id_subject = $1'
  let value = [req.params.id]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'student not found',
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

export const getGradesByRut = async (req, res) => {
  let text = 'SELECT * FROM grade WHERE rut_student = $1'
  let value = [req.params.rut]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'student not found',
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

export const postGrade = async (req, res) => {
  // chequear validez de nota ingresada
  if (req.body.grade < 10) {
    req.body.grade = req.body.grade * 10
  }
  if (req.body.grade >= 71 || req.body.grade < 10) {
    res.status(400)
    res.json({
      message: 'the grade is invalid',
    })
    return
  }

  // chequear cantidad de notas
  let textCheck =
    'SELECT * FROM grade WHERE rut_student = $1 AND id_subject = $2 AND exam = false'
  let valueCheck = [req.body.rut, req.body.id]
  try {
    let query = await client.query(textCheck, valueCheck)
    if (query.rows.length >= 4) {
      res.status(400)
      res.json({
        message: 'student already has 4 notes in this subject',
      })
    }
    return
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
  // chequear cantidad de examenes en el ramo
  let examText =
    'SELECT * FROM grade WHERE rut_student = $1 AND id_subject = $2 AND exam = true'
  let examValue = [req.body.rut, req.body.id]
  try {
    let query = await client.query(examText, examValue)
    if (query.rows.length >= 1) {
      res.status(400)
      res.json({
        message: 'student already has an exam registered in this subject',
      })
    }
    return
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
  let text =
    'INSERT INTO grade(rut_student, id_subject, grade, exam) VALUES($1, $2, $3, false) RETURNING *'
  let values = [req.body.rut, req.body.id, req.body.grade]
  try {
    try {
      let query = await client.query(text, values)
      res.json({
        message: 'postsuccess',
        rut_student: query.rows[0].rut_student,
        id_subject: query.rows[0].id_subject,
        grade: query.rows[0].grade,
        exam: query.rows[0].exam,
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
