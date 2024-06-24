import { Route, Routes } from 'react-router-dom';
import Menu from './components/header/menu';

function App() {
  
  const Layout = () => (
    <>
      <Menu/>
    </>
  )

  return (
      <Routes>
         <Route path='/' element={<Layout />} >
         </Route>
      </Routes>
  )
}

export default App
