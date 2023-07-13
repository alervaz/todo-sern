import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SingleTodo from './components/SingleTodo';




function App() {


  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id' element={<SingleTodo/>}/>
    </Routes>
  )
}

export default App
