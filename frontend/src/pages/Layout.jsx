import { Outlet, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Form from 'react-bootstrap/Form'
import { useEffect, useState } from 'react'

export default function Layout() {
  const navigate = useNavigate()
  const handleRadioButtonCheck = (event) => {
        navigate(`/${event.target.id}`)
  }
  return (
    <div>
      <Helmet>
        <title>matolink</title>
      </Helmet>
      <div className='container align-items-centered'>
        <br />
        <h1>Sistema de Notas</h1>
        <br />
        <Form>
          <br />
          {['radio'].map((type) => (
            <div key={`inline-${type}`} className='mb-3'>
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='por RUT'
                name='group1'
                type={type}
                id={'byrut'}
              />
              <Form.Check
                onClick={handleRadioButtonCheck}
                inline
                label='por Curso Entero'
                name='group1'
                type={type}
                id={'bysubject'}
              />
            </div>
          ))}
        </Form>
        <Outlet />
      </div>
    </div>
  )
}
