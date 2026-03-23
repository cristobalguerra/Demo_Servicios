import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import Chatbot from './components/Chatbot'
import WhatsAppButton from './components/WhatsAppButton'
import MobileCTA from './components/MobileCTA'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={
          <>
            <Chatbot />
            <WhatsAppButton />
            <MobileCTA />
          </>
        } />
      </Routes>
    </>
  )
}
