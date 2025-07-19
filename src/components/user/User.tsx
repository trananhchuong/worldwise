import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import { useAuth } from "../../contexts/FakeAuthContext";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {user ? (
        <>
          <img src={user.avatar} alt={user.name} />
          <span>Welcome, {user.name}</span>
          <button onClick={handleClick}>Logout</button>
        </>
      ) : (
        <span>No user logged in.</span>
      )}
    </div>
  );
}

export default User;