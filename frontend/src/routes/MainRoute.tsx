import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MenuPage from '../pages/menu/MenuPage';
import NotFound from '../components/common/errorPage';
const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/"     element={<MenuPage />} />
      <Route path="/menu" element={<MenuPage />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;

