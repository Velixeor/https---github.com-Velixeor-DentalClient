import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
// Импортируем логотип
import logo from './assets/logo.png';  // Убедитесь, что путь правильный

import { Projects } from "./pages/Projects";
import { MyTasks } from "./pages/MyTasks";
import { PendingApproval } from "./pages/PendingApproval";
import { CreateProject } from "./pages/CreateProject";

function App() {
  return (
    <Router>
      {/* Хедер с логотипом и навигацией */}
      <header className="header">
        {/* Контейнер для содержимого хедера */}
        <div className="header-content">
          <div className="logo-container">
            {/* Логотип с ссылкой на главную */}
            <Link to="/projects">
              <img src={logo} alt="Логотип" className="logo" />
            </Link>
          </div>

          {/* Навигация */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
