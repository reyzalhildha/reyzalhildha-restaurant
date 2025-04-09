import styles from "./Home.module.css";
import CreateOrder from "../CreateOrder";

const Home = () => {
  return (
    <>
      <main className={styles.home}>
        <CreateOrder />
      </main>
    </>
  );
};

export default Home;
