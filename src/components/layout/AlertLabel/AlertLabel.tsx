import styles from "./AlertLabel.module.scss";

type Prop = {
  text: string;
};
export const AlertLabel: React.VoidFunctionComponent<Prop> = ({ text }) => {
  return <div className={styles.alertLabel}>{text}</div>;
};
export default AlertLabel;
