import { useState, type FormEvent } from "react";
import Button from "../../components/button/Button";
import PageNav from "../../components/nav/PageNav";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // if (email && password) login(email, password);
    console.log("🚀 ~ handleSubmit ~ password:", password)
    console.log("🚀 ~ handleSubmit ~ email:", email)
  }



  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
