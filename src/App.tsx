import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Region } from "./pages";
import { DaemonProvider } from "./providers/DaemonProvider";
import FAQ from "./pages/FAQ";
import ConfigDevice from "./pages/ConfigDevice";
import Vip from "./pages/Vip";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import Passcode from "./pages/Passcode";
import Languages from "./pages/Languages";
import Applications from "./pages/Applications";
import Subscription from "./pages/Subscription";
import Support from "./pages/Support";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/regions" element={<Region />}></Route>
          <Route path="/faq" element={<FAQ />}></Route>
          <Route path="/config-device" element={<ConfigDevice />}></Route>
          <Route path="/vip" element={<Vip />}></Route>
          <Route path="/wallet" element={<Wallet />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/passcode" element={<Passcode />}></Route>
          <Route path="/languages" element={<Languages />}></Route>
          <Route path="/applications" element={<Applications />}></Route>
          <Route path="/subscription" element={<Subscription />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
