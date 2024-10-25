import Footer from './components/Footer/Footer'
import AppRouter from './routes/AppRouter'
import Navigation from './components/Navigation/Navigation'
import NavBar from './components/NavBar/NavBar'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <div>
        <Navigation/>
      </div>
      <div>
        <AppRouter/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default App
