import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import AppRoutes from './routes/MainRoute';
import Loader from './components/common/Loader';


const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);

  if (loading) return <Loader />;

  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </React.Suspense>
  );
};

export default App;