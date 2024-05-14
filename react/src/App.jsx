
import { AllCharacters } from './components/AllCharacters';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/characters" element={<AllCharacters />}>
        </Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
