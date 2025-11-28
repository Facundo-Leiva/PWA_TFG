import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard";
import CreateReport from "./components/CreateReport";
import UserProfile from "./components/UserProfile";
import ReportDetail from "./components/ReportDetail";
import type { Report } from "./components/ReportCard";
import DashboardExploracion from "./components/exploracion/DashboardExploracion";
import OtherUserProfile from "./components/OtherUserProfile";
import ReportDetailExploracion from "./components/exploracion/ReportDetailExploracion";
import UserProfileExploracion from "./components/exploracion/UserProfileExploracion";

// Componente Raíz de la Aplicación REACT
function App() {

  // Control de pantallas
  const [screen, setScreen] = useState <
    "welcome" | "login" | "register" | "create" | "profile" | "detail" | "detailExploracion" | 
    "dashboardExploracion" | "userProfile" | "userProfileExploracion" | "dashboard"
  > ("welcome");

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Cambiar al Dashboard
  const handleLogin = () => {
    setScreen("dashboard");
  };

  // Navegación entre componentes
  return (
    <>
      {screen === "welcome" && (
        <WelcomeScreen
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
          onExplore={() => setScreen("dashboardExploracion")}
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
          onShowProfile={() => setScreen("profile")}
          onShowDetail={(report) => {
            setSelectedReport(report);
            setScreen("detail");
          }}
        />
      )}

      {screen === "dashboardExploracion" && (
        <DashboardExploracion
          onShowDetail={(report) => {
            setSelectedReport(report);
            setScreen("detailExploracion");
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
          onViewUser={(userId) => {
            setSelectedUserId(userId);
            setScreen("userProfile");
          }}
          currentUser={localStorage.getItem("userName") || ""}
        />
      )}

      {screen === "detailExploracion" && selectedReport && (
        <ReportDetailExploracion
          report={selectedReport}
          onBack={() => {
            setSelectedReport(null);
            setScreen("dashboardExploracion");
          }}
          onViewUser={(userId) => {
            setSelectedUserId(userId);
            setScreen("userProfileExploracion");
          }}
        />
      )}

      {screen === "userProfile" && selectedUserId && (
        <OtherUserProfile
          userId={selectedUserId}
          onBack={() => {
            setSelectedUserId(null);
            setScreen("dashboard");
          }}
        />
      )}

      {screen === "userProfileExploracion" && selectedUserId && (
        <UserProfileExploracion
          userId={selectedUserId}
          onBack={() => {
            setSelectedUserId(null);
            setScreen("dashboardExploracion");
          }}
        />
      )}
    </>
  );
}

export default App
