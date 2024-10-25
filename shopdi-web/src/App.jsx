import Footer from './Buyer/components/Footer/Footer'
import AppRouter from './routes/AppRouter'
import Navigation from './Buyer/components/Navigation/Navigation'
import NavBar from './Buyer/components/NavBar/NavBar'

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
