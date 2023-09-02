import { AnimatePresence } from 'framer-motion';
import Header from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Model from './pages/model';
import './App.scss';

const imageDetails = {
  width: 324,
  height: 324,
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatePresence initial={true} mode="wait">
        <Routes>
          <Route path="/" element={<Home imageDetails={imageDetails} />} />
          <Route
            path="/model/:id"
            element={<Model imageDetails={imageDetails} />}
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
