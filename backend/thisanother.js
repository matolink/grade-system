fetch('http://localhost:3000/api/grades',{
    method: "POST",
    headers: {'Content-Type':'Aplication/json'},
    body: JSON.stringify({
        id:2,
        grade:20,
        rut:'3287493287-2',
        exam: true
    })
}).then((res)=>res.json()).then((json)=>console.log(json))
