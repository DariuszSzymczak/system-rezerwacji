import HorizontalMenu from "@/components/layout/HorizontalMenu";
import Header from "@components/layout/Header";
import styles from "./Reservations.module.scss";
import "react-awesome-slider/dist/styles.css";
import React from "react";
import VerticalLineDivider from "@/components/layout/VerticalLineDivider";
import RoomsColumnList from "@/components/layout/RoomsColumnList";
import { Room } from "@/API/API";
import RentFormModal from "@/components/layout/RentFormModal";
export const Reservations: React.VoidFunctionComponent = () => {
  const [dateFrom, setDateFrom] = React.useState<string>("");
  const [dateTo, setDateTo] = React.useState<string>("");
  const [selectedRoom, setSelectedRoom] = React.useState<Room>();
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const rentRoomHandle = (room: Room) => {
    setModalOpen(true);
    setSelectedRoom(room);
  };

  const renderModal = isModalOpen && (
    <RentFormModal
      room={selectedRoom}
      clickHander={() => {
        setModalOpen(!isModalOpen);
      }}
      dateTo={dateTo}
      dateFrom={dateFrom}
    />
  );

  return (
    <div id="main-box" className={styles.mainBox}>
      {renderModal}
      <section>
        <Header />
      </section>
      <section>
        <HorizontalMenu mode="back" />
      </section>
      <h2 className={styles.leftHeader}>Wybierz datę</h2>
      <section className={styles.pickersBox}>
        <div className={styles.picker}>
          <label>data od:</label>
          <input
            type="date"
            className={styles.datePicker}
            value={dateFrom}
            onChange={(event) => {
              setDateFrom(event.target.value);
            }}
          />
        </div>

        <div className={styles.picker}>
          <label>data do:</label>

          <input
            type="date"
            value={dateTo}
            className={styles.datePicker}
            onChange={(event) => {
              setDateTo(event.target.value);
            }}
          />
        </div>
        <section className={styles.boxedSection}>
          <h2>Dostepne pokoje:</h2>
          <VerticalLineDivider />
          <RoomsColumnList
            from={dateFrom}
            to={dateTo}
            buttonHandler={rentRoomHandle}
            mode="rent"
          />
        </section>
      </section>
      <section id="kontakt" className={styles.kontaktBox}>
        <p>tel: 872 222 212</p>
        <p>tel: 872 233 244</p>
        <p>fax: +48 872 233 244</p>
        <p>email: hotelegzotyka@gmail.com</p>
      </section>
    </div>
  );
};
export default Reservations;
