import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        throw new Error("Неверный mail или пароль");
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
        placeholder="Mail"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        className={styles.loginInput}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.loginInput}
      />
      <button onClick={handleLogin} className={styles.loginButton}>
        Войти
      </button>
      {error && <p className={styles.loginError}>{error}</p>}
        <p className={styles.switchText}>
            Нет аккаунта?{" "}
         <span onClick={() => navigate("/register")} className={styles.switchLink}>
          Зарегистрироваться
        </span>
        </p>
    </div>
  );
};

export default LoginPage;
