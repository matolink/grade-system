import client from '../pg_client.js'

export const createTables = async (req, res) => {
  try {
    const result = await client.query(
      '\
        DROP TABLE IF EXISTS grade;\
        DROP TABLE IF EXISTS student_subject;\
        DROP TABLE IF EXISTS subject;\
        DROP TABLE IF EXISTS student;\
        DROP TABLE IF EXISTS teacher;\
        \
        CREATE TABLE IF NOT EXISTS student(\
        rut varchar(255) NOT NULL,\
        name varchar(255) NOT NULL UNIQUE,\
        PRIMARY KEY (rut)\
        );\
        \
        CREATE TABLE IF NOT EXISTS teacher(\
        rut varchar(255) NOT NULL,\
        name varchar(255) NOT NULL UNIQUE,\
        PRIMARY KEY (rut)\
        );\
        \
        CREATE TABLE IF NOT EXISTS subject(\
        id SERIAL,\
        name varchar(255) NOT NULL UNIQUE,\
        rut_teacher varchar(255) REFERENCES teacher (rut) NOT NULL,\
        PRIMARY KEY (id)\
        );\
        \
        CREATE TABLE IF NOT EXISTS student_subject(\
        id_subject int REFERENCES subject (id) NOT NULL,\
        rut_student varchar(255) REFERENCES student (rut) NOT NULL,\
        PRIMARY KEY (id_subject, rut_student)\
        );\
        \
        CREATE TABLE IF NOT EXISTS grade(\
        id SERIAL,\
        rut_student varchar(255) REFERENCES student (rut) NOT NULL,\
        id_subject int REFERENCES subject (id) NOT NULL,\
        grade int NOT NULL,\
        exam bool NOT NULL,\
        PRIMARY KEY (id)\
        );\
        '
    )
    res.json(result) } catch {
    res.status(500)
    res.json({
      message: 'internal server error',
    })
  }
}
