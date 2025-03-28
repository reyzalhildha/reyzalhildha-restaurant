import styles from "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import CreateOrder from "../CreateOrder";

const Home = () => {
  return (
    <>
      <main className={styles.home}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.content}>
          <CreateOrder />
        </div>
      </main>
    </>
  );
};

export default Home;
