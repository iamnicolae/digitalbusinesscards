import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProfileProvider } from './contexts/ProfileContext'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import GlobalStyle from './styles/global'

function App() {
  return (
    <ProfileProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/:slug" element={<Profile />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App