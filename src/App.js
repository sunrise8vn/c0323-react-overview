import './App.css';
import React, { useState, createContext, useContext } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from 'react-router-dom';
import StudentList from './components/student/StudentList';
import PostList from './components/post/PostList';
import StudetnDetail from './components/student/StudentDetail';

import Layout from './components/layout';
import ProductUpload from './components/ProductUpload';
import ProductCreate from './components/product/Create';
import ProductList from './components/product/List';
import ProductEdit from './components/product/Edit';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState('CodeGym');
  const [products, setProducts] = useState([]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, products, setProducts }}>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<StudentList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/:id" element={<ProductEdit />} />
            <Route path="/student/list" element={<StudentList />} />
            <Route
              path="/student/detail/:studentId"
              element={<StudetnDetail />}
            />
            <Route path="/post/list" element={<PostList />} />
            <Route path="/products/create" element={<ProductUpload />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
