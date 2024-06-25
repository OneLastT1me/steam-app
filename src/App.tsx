import { Outlet, Route, Routes } from 'react-router-dom';
import Menu from './components/header/menu';
import Profile from './components/Profile';

function App() {
  
  const Layout = () => (
    <>
      <Menu/>
      <Outlet />
    </>
  )

  return (
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/profile' element={<Profile />} />
        </Route >
      </Routes>
  )
}

export default App
