import client from '../pg_client.js'

export const getStudents = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM student')
    res.json(result.rows)
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
    return
  }
}

export const getStudent = async (req, res) => {
  let text = 'SELECT * FROM student WHERE rut = $1'
  let value = [req.params.rut]
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

export const postStudent = async (req, res) => {
  let text = 'INSERT INTO student(rut, name) VALUES($1, $2) RETURNING *'
  let values = [req.body.rut, req.body.name]
  if (req.body.rut.length <= 9 || req.body.name.lenth <= 10) {
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
        name: query.rows[0].name,
        rut: query.rows[0].rut,
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
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
      variant: 'danger',
    })
    return
  }
}
