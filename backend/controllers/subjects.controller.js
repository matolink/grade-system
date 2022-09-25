import client from '../pg_client.js'

export const getSubjects = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM subject')
    res.json(result.rows)
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
}

export const getSubject = async (req, res) => {
  let text = 'SELECT * FROM subject WHERE id = $1'
  let value = [req.params.id]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'subject not found',
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

export const postSubject = async (req, res) => {
  let textCheck = 'SELECT * FROM subject WHERE rut_teacher = $1'
  let valueCheck = [req.body.rut_teacher]
  try {
    let query = await client.query(textCheck, valueCheck)
    if (query.rows.length >= 2) {
      res.status(400)
      res.json({
        message: 'teacher already has 2 subjects',
      })
      return
    }
  } catch (error) {}
  let text = 'INSERT INTO subject(rut_teacher, name) VALUES($1, $2) RETURNING *'
  let values = [req.body.rut_teacher, req.body.name]
  try {
    try {
      let query = await client.query(text, values)
      res.json({
        message: 'postsuccess',
        name: query.rows[0].name,
        rut: query.rows[0].rut_teacher,
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
