import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard";
import CreateReport from "./components/CreateReport";
import UserProfile from "./components/UserProfile";
import ReportDetail from "./components/ReportDetail";
import type { Report } from "./components/ReportCard";
import DashboardSecundario from "./components/DashboardSecundario";

function App() {
  const [screen, setScreen] = useState<"welcome" | "login" | "register" | "create" | "profile" | "detail" | "detailSecundario" | "dashboardSecundario" | "dashboard">("welcome");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleLogin = () => {
    setScreen("dashboard");
  };

  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
          onExplore={() => setScreen("dashboardSecundario")}
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
        />
      )}

      {screen === "dashboard" && (
        <Dashboard 
          onCreateReport={() => setScreen("create")} 
          onShowProfile={() => setScreen("profile")}
          onShowDetail={(report) => {
            setSelectedReport(report);
            setScreen("detail");
          }}
        />
      )}

      {screen === "dashboardSecundario" && (
        <DashboardSecundario
          onShowDetail={(report) => {
            setSelectedReport(report);
            setScreen("detailSecundario");
          }}
        />
      )}

      {screen === "create" && (
        <CreateReport
          onBack={() => setScreen("dashboard")}
          onSubmit={(report) => {
            console.log("Nuevo reporte:", report);
            setScreen("dashboard");
          }}
        />
      )}

      {screen === "profile" && (
        <UserProfile 
          onBack={() => setScreen("dashboard")} 
        />
      )}

      {screen === "detail" && selectedReport && (
        <ReportDetail
          report={selectedReport}
          onBack={() => {
            setSelectedReport(null);
            setScreen("dashboard");
          }}
        />
      )}

      {screen === "detailSecundario" && selectedReport && (
        <ReportDetail
          report={selectedReport}
          onBack={() => {
            setSelectedReport(null);
            setScreen("dashboardSecundario");
          }}
        />
      )}
    </>
  );
}

export default App
