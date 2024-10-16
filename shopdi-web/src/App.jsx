import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import Navigation from './components/Navigation/Navigation'
import LoginForm from './pages/Auth/LoginForm'
import HomePage from './pages/HomePage'
import AppRouter from './routes/AppRouter'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <div>
        <Navigation />
      </div>
      <HomePage/>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
