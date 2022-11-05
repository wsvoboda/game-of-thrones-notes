import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import Favorites from './components/Favorites';
import CharacterSearch from './components/CharacterSearch';
import Profile from './components/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />} >
          <Route index element={<Intro />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/search/characters' element={<CharacterSearch />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
