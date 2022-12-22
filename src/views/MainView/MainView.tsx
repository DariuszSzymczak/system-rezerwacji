import HorizontalMenu from "@/components/layout/HorizontalMenu";
import Header from "@components/layout/Header";
import styles from "./MainView.module.scss";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import TwoSidesBox from "@/components/layout/TwoSidesBox";
import RoomsColumnList from "@/components/layout/RoomsColumnList";
import VerticalLineDivider from "@/components/layout/VerticalLineDivider";
import { Link, Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getReservationsList } from "@/API/reservationsSlice";
import { getRoomsList } from "@/API/roomsSlice";
import { getPhotosList } from "@/API/photosSlice";
import React from "react";
import { RootState } from "@/store";
export const MainView: React.VoidFunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { rooms, reservations, photos } = useAppSelector(
    (state: RootState) => ({
      rooms: state.rooms.rooms,
      reservations: state.reservations.reservations,
      photos: state.photos.photos,
    })
  );
  React.useLayoutEffect(() => {
    if (rooms.length === 0) {
      dispatch(getRoomsList());
    }
    if (reservations.length === 0) {
      dispatch(getReservationsList());
    }
    if (photos.length === 0) {
      dispatch(getPhotosList());
    }
  }, []);

  const slider = (
    <AwesomeSlider>
      <div data-src="/assets/slider/1.png" />
      <div data-src="/assets/slider/2.png" />
      <div data-src="/assets/slider/3.png" />
    </AwesomeSlider>
  );

  const welcomeText = (
    <div className={styles.hotelDesc}>
      <h1>Witamy</h1>
      <p>
        Nasz hotel działa już od 2001 roku i oferuje wiele atrakcji takich jak
        basen, sauny, strefa fitness oraz jacuzzi, a widok na tatry nadaje
        wszystkiemu magicznego wyglądu.
      </p>
      <p>
        Zapraszamy do zapoznania się z ofertą hotelu oraz promocjami. Mamy
        również nadzieje, że będą Państwo usatysfakcjonowani naszą ofertą i po
        wizycie będziecie pobyt tutaj wspominać długo i z uśmiechem na ustach :)
      </p>
    </div>
  );

  return (
    <div id="main-box" className={styles.mainBox}>
      <section>
        <Header />
      </section>
      <section>
        <HorizontalMenu />
      </section>
      <section>
        <TwoSidesBox position="left" left={slider} right={welcomeText} />
      </section>
      <section className={styles.boxedSection} id="pokoje">
        <h2 className={styles.RoomsHeader}>Nasze pokoje</h2>
        <VerticalLineDivider />
        <RoomsColumnList mode="all" />
      </section>
      <section id="rezerwacje" className={styles.rezerwacjeBox}>
        <Link to="/reservations">
          <button id={styles.rentRoomButton}>Zarezerwuj Pokój</button>
        </Link>
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
export default MainView;
