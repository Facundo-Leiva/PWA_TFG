import { useEffect, useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Dashboard";
import CreateReport from "./components/CreateReport";
import UserProfile from "./components/UserProfile";
import ReportDetail from "./components/ReportDetail";
import type { Report } from "./components/ReportCard";
import type { AuthUser } from "./api";
import DashboardExploracion from "./components/exploracion/DashboardExploracion";
import OtherUserProfile from "./components/OtherUserProfile";
import ReportDetailExploracion from "./components/exploracion/ReportDetailExploracion";
import UserProfileExploracion from "./components/exploracion/UserProfileExploracion";

type Screen =
  | "welcome"
  | "login"
  | "register"
  | "create"
  | "profile"
  | "detail"
  | "detailExploracion"
  | "dashboardExploracion"
  | "userProfile"
  | "userProfileExploracion"
  | "dashboard";

const SCREEN_STORAGE_KEY = "currentScreen";
const REPORT_STORAGE_KEY = "selectedReport";
const USER_STORAGE_KEY = "selectedUserId";
const DASHBOARD_VIEW_STORAGE_KEY = "dashboardView";
const EXPLORATION_VIEW_STORAGE_KEY = "explorationDashboardView";

const validScreens: Screen[] = [
  "welcome",
  "login",
  "register",
  "create",
  "profile",
  "detail",
  "detailExploracion",
  "dashboardExploracion",
  "userProfile",
  "userProfileExploracion",
  "dashboard",
];

const privateScreens = new Set<Screen>([
  "dashboard",
  "create",
  "profile",
  "detail",
  "userProfile",
]);

function isScreen(value: string | null): value is Screen {
  return value !== null && validScreens.includes(value as Screen);
}

function getStoredReport(): Report | null {
  const storedReport = sessionStorage.getItem(REPORT_STORAGE_KEY);
  if (!storedReport) return null;

  try {
    const report = JSON.parse(storedReport) as Report;
    return typeof report?.id === "number" ? report : null;
  } catch {
    return null;
  }
}

function getStoredUserId(): number | null {
  const storedUserId = Number(sessionStorage.getItem(USER_STORAGE_KEY));
  return Number.isInteger(storedUserId) && storedUserId > 0 ? storedUserId : null;
}

function getInitialScreen(): Screen {
  const hasToken = Boolean(localStorage.getItem("token"));
  const storedScreen = sessionStorage.getItem(SCREEN_STORAGE_KEY);

  if (!isScreen(storedScreen)) {
    return hasToken ? "dashboard" : "welcome";
  }

  if (privateScreens.has(storedScreen) && !hasToken) {
    return "welcome";
  }

  if (storedScreen === "detail" && !getStoredReport()) {
    return "dashboard";
  }

  if (storedScreen === "detailExploracion" && !getStoredReport()) {
    return "dashboardExploracion";
  }

  if (storedScreen === "userProfile" && !getStoredUserId()) {
    return "dashboard";
  }

  if (storedScreen === "userProfileExploracion" && !getStoredUserId()) {
    return "dashboardExploracion";
  }

  return storedScreen;
}

// Componente Raíz de la Aplicación REACT
function App() {
  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const [selectedReport, setSelectedReport] = useState<Report | null>(getStoredReport);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(getStoredUserId);

  useEffect(() => {
    sessionStorage.setItem(SCREEN_STORAGE_KEY, screen);
  }, [screen]);

  useEffect(() => {
    if (selectedReport) {
      sessionStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(selectedReport));
    } else {
      sessionStorage.removeItem(REPORT_STORAGE_KEY);
    }
  }, [selectedReport]);

  useEffect(() => {
    if (selectedUserId) {
      sessionStorage.setItem(USER_STORAGE_KEY, String(selectedUserId));
    } else {
      sessionStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [selectedUserId]);

  // Cambiar al Dashboard y conservar los datos básicos de la sesión.
  const handleLogin = (usuario: AuthUser) => {
    localStorage.setItem("authUser", JSON.stringify(usuario));
    localStorage.setItem("userName", `${usuario.nombre} ${usuario.apellido}`.trim());
    setSelectedReport(null);
    setSelectedUserId(null);
    setScreen("dashboard");
  };

  // Volver desde el modo exploración sin alterar una posible sesión autenticada.
  const handleExitExploration = () => {
    sessionStorage.removeItem(SCREEN_STORAGE_KEY);
    sessionStorage.removeItem(REPORT_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(EXPLORATION_VIEW_STORAGE_KEY);

    setSelectedReport(null);
    setSelectedUserId(null);
    setScreen("welcome");
  };

  // El JWT se elimina localmente porque la autenticación del backend no usa cookies.
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    localStorage.removeItem("userName");

    sessionStorage.removeItem(SCREEN_STORAGE_KEY);
    sessionStorage.removeItem(REPORT_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(DASHBOARD_VIEW_STORAGE_KEY);
    sessionStorage.removeItem(EXPLORATION_VIEW_STORAGE_KEY);

    setSelectedReport(null);
    setSelectedUserId(null);
    setScreen("welcome");
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
          onLogout={handleLogout}
          onShowDetail={(report) => {
            setSelectedReport(report);
            setScreen("detail");
          }}
        />
      )}

      {screen === "dashboardExploracion" && (
        <DashboardExploracion
          onExit={handleExitExploration}
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

export default App;
