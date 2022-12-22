import HorizontalMenu from "@/components/layout/HorizontalMenu";
import Header from "@components/layout/Header";
import styles from "./Admin.module.scss";
import "react-awesome-slider/dist/styles.css";
import { getAuth } from "firebase/auth";
import { getReservationsList } from "@/API/reservationsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import React from "react";
import { Api } from "@/API/API";
import { RootState } from "@/store";
type FormTypes = {
  email: string;
  password: string;
};

export const Admin: React.VoidFunctionComponent = () => {
  const api = new Api();
  const dispatch = useAppDispatch();
  const { reservations } = useAppSelector((state: RootState) => ({
    ...state.reservations,
  }));

  React.useLayoutEffect(() => {
    const token = localStorage.getItem("admin_token");
    const auth = getAuth().currentUser as any;
    if (token === auth.accessToken) {
      dispatch(getReservationsList());
    }
  }, []);

  const generateList = reservations.map((reservation) => (
    <tr>
      <td>{reservation.nr_pokoj}</td>
      <td>{reservation.od}</td>
      <td>{reservation.do}</td>
      <td>{reservation.imie}</td>
      <td>{reservation.nazwisko}</td>
      <td>{reservation.email}</td>
      <td>{reservation.tel}</td>
      <td
        className={styles.x}
        onClick={async () => {
          api.deleteReservation(reservation);
          dispatch(getReservationsList());
        }}
      >
        x
      </td>
    </tr>
  ));

  return (
    <div id="main-box" className={styles.mainBox}>
      <section>
        <Header />
      </section>
      <section>
        <HorizontalMenu mode="back" />
      </section>
      <section className={styles.boxedSection}>
        <h1>Lista rezerwacji</h1>
        <table>
          <tr>
            <th>NR POKOJU</th>
            <th>OD</th>
            <th>DO</th>
            <th>IMIE</th>
            <th>NAZWISKO</th>
            <th>EMAIL</th>
            <th>TELEFON</th>
            <th>ANULUJ REZERWACJE</th>
          </tr>
          {generateList}
        </table>
      </section>
    </div>
  );
};
export default Admin;
