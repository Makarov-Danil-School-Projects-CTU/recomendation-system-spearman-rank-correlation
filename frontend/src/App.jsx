import { Route, Routes } from 'react-router-dom'

import g from './App.module.css'
import ProtectedRoute from './ProtectedRoute'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import AllFilms from './pages/AllFilms/AllFilms'
import FilmDetail from './pages/FilmDetail/FilmDetail'
import Films from './pages/Films/Films'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import RatedFilms from './pages/RatedFilms/RatedFilms'

function App() {
  
  return (
    <div className={g.App}>
      <ScrollToTop />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path='/films' element={<Films />} />
          <Route exact path='/films/:id' element={<FilmDetail />} />
          <Route exact path='/rated-films' element={<RatedFilms />} />
          <Route exact path='/unrated-films' element={<AllFilms />} />
          <Route exact path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
