import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Landing from "./layout/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import SetAlert from "./components/SetAlert";
import Register from "./auth/Register";
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <SetAlert />  
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
        <Container>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
