import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { TiPiOutline } from "react-icons/ti";

const Navbar = () => {
  const [btn, setBtn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setBtn(true);
    } else {
      setBtn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };

  return (
    <main className={styles.navbar}>
      <div>
        <h1>
          REYZALHILDHA
          <sup>
            <TiPiOutline />
          </sup>
        </h1>
      </div>
      <div className={styles.listNavbar}>
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>Cart</Link>
        <Link to={"/order"}>Order</Link>
      </div>
      <div>
        {btn ? (
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Navbar;
