import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import logo from './assets/logo.png';  

import { Projects } from "./pages/Projects";
import { MyTasks } from "./pages/MyTasks";
import { PendingApproval } from "./pages/PendingApproval";
import { CreateProject } from "./pages/CreateProject";
import { ToothDetails } from "./pages/ToothDetails";
import { TeethProvider } from "./context/TeethContext";  // Импорт контекста

function App() {
  return (
    <Router>
      <TeethProvider>  {/* ⬅ Обернули в TeethProvider */}
        <div className="wrapper">
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
                </ul>
              </nav>
            </div>
          </header>

          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/projects" />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<MyTasks />} />
              <Route path="/pending" element={<PendingApproval />} />
              <Route path="/create" element={<CreateProject />} />
              <Route path="/tooth/:id" element={<ToothDetails />} />
            </Routes>
          </div>
        </div>
      </TeethProvider>  {/* ⬅ Закрыли TeethProvider */}
    </Router>
  );
}

export default App;
