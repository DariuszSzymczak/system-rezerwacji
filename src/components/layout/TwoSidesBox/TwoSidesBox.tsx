import styles from "./TwoSidesBox.module.scss";

type props = {
  position: "left" | "right" | "half";
  left: JSX.Element;
  right: JSX.Element;
};

export const TwoSidesBox: React.VoidFunctionComponent<props> = ({
  position,
  left,
  right,
}) => {
  const box =
    position === "left" ? (
      <>
        <div className={styles.long}>{left}</div>
        <div className={styles.short}>{right}</div>
      </>
    ) : position === "right" ? (
      <>
        <div className={styles.short}>{left}</div>
        <div className={styles.long}>{right}</div>
      </>
    ) : (
      <>
        <div className={styles.half}>{left}</div>
        <div className={styles.half}>{right}</div>
      </>
    );

  return <div className={styles.outerBox}>{box}</div>;
};
export default TwoSidesBox;
