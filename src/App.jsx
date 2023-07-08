import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProfileProvider } from './contexts/ProfileContext'
import Home from './pages/Home'
import Profile from './pages/Profile'
import GlobalStyle from './styles/global'

function App() {
  return (
    <ProfileProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  )
}

export default App