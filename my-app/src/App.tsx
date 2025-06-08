import "./App.css";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

import logo from './assets/logo.png';  
import { Projects } from "./pages/Projects";
import { MyTasks } from "./pages/MyTasks";
import { TasksForApproval } from "./pages/PendingApproval";
import { CreateProject } from "./pages/CreateProject";
import  RegisterPage  from "./pages/RegisterPage";
import { ToothDetails } from "./pages/ToothDetails";
import { Prostheses } from "./pages/Prostheses";
import { TeethProvider } from "./context/TeethContext";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <TeethProvider>
      <AuthProvider>
        <div className="wrapper">
          {/* Только если не на странице логина, показываем хедер */}
          {!hideHeader && (
            <header className="header">
              <div className="header-content">
                <div className="logo-container">
                  <Link to="/projects">
                    <img src={logo} alt="Логотип" className="logo" />
                  </Link>
                </div>
                <nav className="nav-container">
                  <ul className="nav-list">
                    <li><Link to="/projects">Проекты</Link></li>
                    <li><Link to="/tasks">Мои задачи</Link></li>
                    <li><Link to="/pending">Ждут подтверждения</Link></li>
                    <li><Link to="/prostheses">Управление шаблонами</Link></li>
                  </ul>
                </nav>
              </div>
            </header>
          )}

          <div className="content">
            {/* <Routes> */}
              {/* <Route path="/login" element={<LoginPage />} /> */}
             
              {/* <Route path="/" element={<Navigate to="/projects" />} /> */}
            
              {/* <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
              <Route path="/tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
              <Route path="/pending" element={<PrivateRoute><PendingApproval /></PrivateRoute>} />
              <Route path="/create" element={<PrivateRoute><CreateProject /></PrivateRoute>} />
              <Route path="/tooth/:id" element={<PrivateRoute><ToothDetails /></PrivateRoute>} /> */}
            {/* </Routes> */}
            <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/" element={<Navigate to="/projects" />} />

  {/* Временно убрали PrivateRoute для тестов */}
  <Route path="/projects" element={<Projects />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/tasks" element={<MyTasks />} />
  <Route path="/pending" element={<TasksForApproval />} />
  <Route path="/create" element={<CreateProject />} />
  <Route path="/prostheses" element={<Prostheses />} />
  <Route path="/tooth/:id" element={<ToothDetails />} />
</Routes>
            
          </div>
        </div>
      </AuthProvider>
    </TeethProvider>
  );
}

export default App;
