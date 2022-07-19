import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ROUTES } from './routes/constants';
import { Home } from './routes/home';
import { NotFound } from './routes/not-found';
import { Play } from './routes/play';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PLAY} element={<Play />} />
        <Route path={ROUTES.OTHER} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
