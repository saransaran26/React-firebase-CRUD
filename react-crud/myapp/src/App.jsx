import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

function App() {
  const[name,setName] = useState('')
  const[age,setAge] = useState('')
  const[students,setstudents] = useState([])

  const onsubmit = async(e) =>{
    e.preventDefault()
    const student = {name,age:parseInt(age)}
    console.log(student)
    await addDoc(collection(db,"students"),student)
    setAge('')
    setName('')
    getstudent()
  }

  const getstudent = async() =>{
    const q = query(collection(db,"students"))
    const querySnapshot = await getDocs(q)
    let students = []
    querySnapshot.forEach((doc)=>{
      students.push({...doc.data(),id:doc.id})
    })
    setstudents(students)
  }

  const editstudent = async(id,name,age) =>{
    await updateDoc(doc(db,"students",id),{
      name,
      age:parseInt(age),
    })
    getstudent()
  }

  const deletestudent = async(id) =>{
    await deleteDoc(doc(db,"students",id))
    getstudent()
  }
useEffect(()=>{
  getstudent()
},[])
  return (
    <div className="app">
      <div className="container">
        <h1 className='heading'>CRUD operations using Firebase and React</h1>
        <form onSubmit={onsubmit} className='add-student'>
            <div className="form-control">
              <label htmlFor="name">Name:</label>
              <input type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)} required></input>
            </div>
            <div className="form-control">
              <label htmlFor="age">Age:</label>
              <input type="text" id='age' value={age} onChange={(e)=>setAge(e.target.value)} required></input>
            </div>
            <button type='submit' className='btn'>Add student</button>
        </form>
        <div className="students">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              students.map((student)=>(
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <button className='btn'
                    onClick={()=>editstudent(student.id,prompt("Enter new name",student.name),prompt("Enter new Age",student.age))}>Edit</button>
                    <button className='btn' onClick={()=>deletestudent(student.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
