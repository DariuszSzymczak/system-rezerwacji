import HorizontalMenu from "@/components/layout/HorizontalMenu";
import Header from "@components/layout/Header";
import styles from "./Login.module.scss";
import "react-awesome-slider/dist/styles.css";
import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

type FormTypes = {
  email: string;
  password: string;
};

export const Login: React.VoidFunctionComponent = () => {
  const [registerMode, setRegisterMode] = React.useState<boolean>(false);
  const [userMessage, setUserMessage] = React.useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries()) as unknown as FormTypes;

    if (registerMode) {
      register(values.email, values.password);
    } else {
      login(values.email, values.password);
    }
  };

  const register = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserMessage(
          `pomyślnie zarejestrowano użytkownika ${userCredential.user}`
        );
      })
      .catch((error) => {
        setUserMessage(`błąd rejestracji: ${error.message}`);
      });
  };

  const login = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user as any;
        setUserMessage(
          `pomyślnie zalogowano użytkownika ${userCredential.user.email}`
        );
        localStorage.setItem("admin_token", user.accessToken);
        navigate("/admin");
      })
      .catch((error) => {
        localStorage.setItem("admin_token", "");
        setUserMessage(`błędny email lub hasło`);
      });
  };

  return (
    <div id="main-box" className={styles.mainBox}>
      <section>
        <Header />
      </section>
      <section>
        <HorizontalMenu mode="back" />
      </section>
      <section>
        <div className={styles.loginBox}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>email</label>
              <input type="text" name="email" />
            </div>
            <div>
              <label>hasło</label>
              <input type="text" name="password" />
            </div>
            <div>
              <input
                type="submit"
                value={registerMode ? "rejestruj" : "zaloguj"}
              />
            </div>
          </form>
          <b>{userMessage}</b>
        </div>
      </section>
    </div>
  );
};
export default Login;
