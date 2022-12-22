import { Link } from "react-router-dom";
import styles from "./HorizontalMenu.module.scss";
type Props = {
  mode?: "back";
};
export const HorizontalMenu: React.VoidFunctionComponent<Props> = ({
  mode,
}) => {
  const menu = (
    <div className={styles.HorizontalMenuBox}>
      <a href="#">O Hotelu</a>
      <a href="#pokoje">Nasze Pokoje</a>
      <a href="#rezerwacje">Rezerwacje</a>
      <a href="#kontakt">Kontakt</a>
    </div>
  );

  const back = (
    <div className={styles.HorizontalMenuBox}>
      <Link to="/">
        <a href="#">Strona Główna</a>
      </Link>
    </div>
  );

  return mode === "back" ? back : menu;
};
export default HorizontalMenu;
