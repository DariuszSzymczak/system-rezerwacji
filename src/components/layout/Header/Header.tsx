import styles from "./Header.module.scss";
export const Header: React.VoidFunctionComponent = () => {
  return (
    <div className={styles.Header}>
      <img src="/assets/images/header.png" />
    </div>
  );
};
export default Header;
