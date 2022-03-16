import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { Auth0Provider } from "@auth0/auth0-react";
import CreateExpense from "./components/CreateExpense";
import EditExpense from "./components/EditExpense";

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateExpense />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
        <Footer />
      </div>
    </Auth0Provider>
  );
}

export default App;
