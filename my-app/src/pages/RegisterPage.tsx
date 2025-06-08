import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/logo.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/company/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mail, password, companyName }),
      });

      if (!response.ok) {
        throw new Error("Ошибка регистрации");
      }

    navigate("/login");

    } catch (err: any) {
      setError(err.message || "Ошибка регистрации");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Логотип" className={styles.loginLogo} />
      </div>
      <h2 className={styles.loginTitle}>Регистрация</h2>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.loginInput}
      />
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
      <input
        type="text"
        placeholder="Название компании"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className={styles.loginInput}
      />
      <button onClick={handleRegister} className={styles.loginButton}>
        Зарегистрироваться
      </button>
      {error && <p className={styles.loginError}>{error}</p>}
      <p className={styles.switchText}>
        Уже есть аккаунт?{" "}
        <span onClick={() => navigate("/login")} className={styles.switchLink}>
          Войти
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
