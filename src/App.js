import './App.css';
import AppRouter from "./pages/AppRouter";
import {BrowserRouter} from "react-router-dom";


function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>

    </div>
  );
}

export default App;
