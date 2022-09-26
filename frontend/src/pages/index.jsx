import { useEffect, useState } from 'react'
export default function Index() {
  const [subjects, setSubjects] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/subjects')
      .then((res) => res.json())
      .then((json) => setSubjects(json))
  }, [])
  return (
    <select defaultValue={0}>
      <option disabled value={0}>
        Selecciona una opcion
      </option>
      {subjects.map((element) => (
        <option key={element.id} value={element.id}>
          {element.name}
        </option>
      ))}
    </select>
  )
}
