import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './src/components/LandingPage';
import Home from './src/components/Home';
import CreateDog from './src/components/CreateDog';
import Details from './src/components/Details';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.baseURL = 'https://pi-dogs-srig.onrender.com/';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				{/*el swuitch o Routes sirve para machear los link en caso de colocar un link invalido machea con el ultimo valido ej: /home/cualquiercosa solo renderiza hasta home*/}
				<Routes>
					<Route exact path='/' element={<LandingPage />} />
					<Route path='/home' element={<Home />} />
					<Route path='/dog' element={<CreateDog />} />
					<Route exact path='/dogs/:id' element={<Details />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
