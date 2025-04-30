import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [userCode, setUserCode] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [error, setError] = useState("");

  // Проверяем, если пользователь уже авторизован, то перенаправляем сразу на /projects
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/projects");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCode, companyCode }),
      });

      if (!response.ok) {
        throw new Error("Неверный код пользователя или лицензия");
      }

      const data = await response.json();
      login(data.token); // Сохраняем токен в контексте и localStorage

    } catch (err: any) {
      setError(err.message || "Ошибка авторизации");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Логотип" className={styles.loginLogo} />
      </div>
      <h2 className={styles.loginTitle}>Авторизация</h2>
      <input
        type="text"
        placeholder="Код сотрудника"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        className={styles.loginInput}
      />
      <input
        type="text"
        placeholder="Лицензионный ключ (код компании)"
        value={companyCode}
        onChange={(e) => setCompanyCode(e.target.value)}
        className={styles.loginInput}
      />
      <button onClick={handleLogin} className={styles.loginButton}>
        Войти
      </button>
      {error && <p className={styles.loginError}>{error}</p>}
    </div>
  );
};

export default LoginPage;
