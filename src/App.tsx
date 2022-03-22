import "./App.css";
import MyForm from "./myForm/MyForm";
import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Contacts from "./contacts/contacts";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App: React.FC = () => {
  const { isAuth } = useTypedSelector(state => state.auth);

  return (
    <BrowserRouter>
      <div className="App">
        {isAuth &&
          <header>
            <nav>
              <div>
                <NavLink to="/">Registration</NavLink>
              </div>
              <div>
                <NavLink to="/contacts">Contacts</NavLink>
              </div>
            </nav>
          </header>
        }
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<MyForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
