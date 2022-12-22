import { Room, Api } from "@/API/API";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RentFormModal.module.scss";

type Prop = {
  room: Room | undefined;
  clickHander: () => void;
  dateFrom: string;
  dateTo: string;
};

type FormTypes = {
  email: string;
  imie: string;
  nazwisko: string;
  tel: string;
};

export const RentFormModal: React.VoidFunctionComponent<Prop> = ({
  room,
  clickHander,
  dateFrom,
  dateTo,
}) => {
  const api = new Api();
  const navigate = useNavigate();
  const [isSend, setIsSend] = React.useState<boolean>(false);
  const [sendInfo, setSendinfo] = React.useState<string>(
    "Rezerwacja wykonana Poprawnie"
  );

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries()) as unknown as FormTypes;
    let id = await api.sendReservation({
      ...values,
      nr_pokoj: room?.nr || 0,
      od: dateFrom,
      do: dateTo,
    });
    if (id) {
      setSendinfo("Rezerwacja wykonana Poprawnie");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setSendinfo("bład podczas wysyłki formularza");
    }
    setIsSend(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.RentFormModalGreybox}>
        <div className={styles.RentFormModal}>
          <div className={styles.RentFormHeader}>
            <h2>Pokój nr {room?.nr}</h2>
            <span className={styles.back} onClick={clickHander}>
              x
            </span>
          </div>
          <b className={styles.dates}>
            od: {dateFrom} - do: {dateTo}
          </b>
          <div className={styles.RentForm}>
            <div className={styles.RentFormInput}>
              <label>Imie:</label>
              <input type="text" name="imie"></input>
            </div>

            <div className={styles.RentFormInput}>
              <label>Nazwisko:</label>
              <input type="text" name="nazwisko"></input>
            </div>

            <div className={styles.RentFormInput}>
              <label>Email:</label>
              <input type="text" name="email"></input>
            </div>
            <div className={styles.RentFormInput}>
              <label>tel:</label>
              <input type="text" name="tel"></input>
            </div>
            {!isSend && (
              <input
                type="submit"
                value="Rezerwuj"
                className={styles.rentButton}
              />
            )}
          </div>
          {isSend && <div className={styles.sendInfo}>{sendInfo}</div>}
        </div>
      </div>
    </form>
  );
};
export default RentFormModal;
function dispatch(arg0: Promise<import("@/API/API").Reservation[]>) {
  throw new Error("Function not implemented.");
}
