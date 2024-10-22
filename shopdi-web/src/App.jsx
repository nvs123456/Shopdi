import Footer from './components/Footer/Footer'
import AppRouter from './routes/AppRouter'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
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
