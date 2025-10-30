import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard";

function App() {
  const [screen, setScreen] = useState<"welcome" | "login" | "register" | "dashboard">("welcome");

  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log("Sesión Iniciada:", credentials);
    setScreen("dashboard");
  };

  const handleRegister = (formData: { name: string; email: string; password: string }) => {
    console.log("Registro Exitoso:", formData);
    setScreen("dashboard");
  };

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
          onExplore={() => setScreen("dashboard")}
        />
      )}

      {screen === "login" && (
        <LoginModal
          onClose={() => setScreen("welcome")}
          onSubmit={handleLogin}
        />
      )}

      {screen === "register" && (
        <RegisterModal
          onClose={() => setScreen("welcome")}
          onSubmit={handleRegister}
        />
      )}

      {screen === "dashboard" && <Dashboard />}
    </>
  );
}

export default App
