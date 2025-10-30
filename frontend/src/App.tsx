import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const [screen, setScreen] = useState("welcome");

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
          onExplore={() => setScreen("dashboard")}
        />
      )}
      {/* Aquí irían los otros componentes como LoginModal, Dashboard, etc. */}
    </>
  );
}

export default App;
