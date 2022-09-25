import client from '../pg_client.js'

export const getTeachers = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM teacher')
    res.json(result.rows)
  } catch (error) {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
}

export const getTeacher = async (req, res) => {
  let text = 'SELECT * FROM student WHERE rut = $1'
  let value = [req.params.rut]
  try {
    const result = await client.query(text, value)
    if (result.rows.length <= 0) {
      res.status(404)
      res.json({
        message: 'teacher not found',
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

export const postTeacher = async (req, res) => {
  let text = 'INSERT INTO teacher(rut, name) VALUES($1, $2) RETURNING *'
  let values = [req.body.rut, req.body.name]
  try {
    try {
      let query = await client.query(text, values)
      res.json({
        message: 'postsuccess',
        name: query.rows[0].name,
        rut: query.rows[0].rut,
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
