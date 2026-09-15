import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Layout from './layout'
import { Dashboard, About, Task, Notes, Lecture } from './pages'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='about' element={<About />} />
          <Route path='task' element={<Task />} />
          <Route path='notes' element={<Notes />} />
          <Route path='lecture' element={<Lecture />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
