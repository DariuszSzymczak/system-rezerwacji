import React from "react";
import "./App.scss";
import MainView from "./views/MainView/";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from "./views/Reservations";
import Login from "./views/Login";
import Admin from "./views/Admin";

const firebaseConfig = {
  apiKey: "AIzaSyCI6DxXvI_yHo3-ImxmrJ4-Ik9gK-sbsDE",

  authDomain: "hotelegzotyka.firebaseapp.com",

  databaseURL: "https://hotelegzotyka-default-rtdb.firebaseio.com",

  projectId: "hotelegzotyka",

  storageBucket: "hotelegzotyka.appspot.com",

  messagingSenderId: "794941455928",

  appId: "1:794941455928:web:5bcfc7f4938431bf15b0cd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/reservations" element={<Reservations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
