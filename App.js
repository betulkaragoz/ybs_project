import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateAccident from './CreateAccident'
import ShowAccident from './ShowAccident'
import ShowAllAccident from './ShowAllAccident'
import AccidentForYear from './AccidentForYear'
import AccidentForMonth from './AccidentForMonth'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateAccident />}></Route>
        <Route path='/ShowAccident' element={<ShowAccident />}></Route>
        <Route path='/ShowAllAccident' element={<ShowAllAccident />}></Route>
        <Route path='/AccidentForYear' element={<AccidentForYear />}></Route>
        <Route path='/AccidentForMonth' element={<AccidentForMonth />}></Route>

      </Routes>
    
    </BrowserRouter>
  )
}

export default App