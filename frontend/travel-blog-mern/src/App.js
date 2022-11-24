
import './App.css';
import Header from './header/Header';
import Home from './home/Home';
import {Routes,Route} from 'react-router-dom'
import Diaries from './diaries/Diaries';
import Auth from './auth/Auth';

function App() {
  return (
    <div className="App">
      <header>
        <Header/>
      </header>

      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/diaries" element={<Diaries/>}/>
          <Route path="/auth" element={<Auth/>}/>
        </Routes>
      </section>
     
    </div>
  );
}

export default App;
