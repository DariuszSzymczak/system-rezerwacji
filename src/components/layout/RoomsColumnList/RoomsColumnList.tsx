import React from "react";
import styles from "./RoomsColumnList.module.scss";
import { Photo, Reservation, Room } from "@/API/API";
import AlertLabel from "../AlertLabel";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store";
import { getReservationsList } from "@/API/reservationsSlice";
import { getRoomsList } from "@/API/roomsSlice";
import { getPhotosList } from "@/API/photosSlice";

type Props = {
  from?: string;
  to?: string;
  buttonHandler?: (room: Room) => void;
  mode: "all" | "rent";
};

export const RoomsColumnList: React.VoidFunctionComponent<Props> = ({
  from,
  to,
  buttonHandler,
  mode,
}) => {
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

  React.useEffect(() => {
    filteredList();
  }, [from, to]);

  React.useEffect(() => {}, [rooms, photos, reservations]);

  const getRoomPhoto = (room: Room) =>
    "assets/images/rooms/" +
    photos?.find((photo) => photo.nr_pokoj === room.nr)?.path;

  const generateList = rooms?.map((room) => (
    <div className={styles.roomBox}>
      <img src={getRoomPhoto(room)} />
      <div className={styles.roomTextBox}>
        <h2>Pokój nr{room.nr}</h2>
        <p>{room.opis}</p>
        <b>cena: {room.cena}zł</b>
      </div>
    </div>
  ));

  const isInScoop = (date: number, from: number, to: number) => {
    if (date > from && date < to) {
      return true;
    } else return false;
  };

  const isCoverWholeScoop = (
    rentDateFrom: number,
    rentDateTo: number,
    scoopFrom: number,
    scoopTo: number
  ) => {
    if (rentDateFrom < scoopFrom && rentDateTo > scoopTo) {
      return true;
    } else return false;
  };

  const filteredList = (): Room[] => {
    const freeRooms: Room[] = [];
    rooms?.forEach((room) => {
      if (from && to) {
        const dateFrom = new Date(from).getTime();
        const dateTo = new Date(to).getTime();
        let isRent = false;
        //filter reservations
        reservations?.forEach((reservation) => {
          const roomDateFrom = new Date(reservation.od).getTime();
          const roomDateTo = new Date(reservation.do).getTime();

          if (room.nr === reservation.nr_pokoj) {
            if (
              isInScoop(dateFrom, roomDateFrom, roomDateTo) ||
              isInScoop(dateTo, roomDateFrom, roomDateTo) ||
              isCoverWholeScoop(dateFrom, dateTo, roomDateFrom, roomDateTo)
            ) {
              isRent = true;
            }
          }
        });

        //add rooms that dont have reservations
        if (
          !reservations?.find((reservation) => reservation.nr_pokoj === room.nr)
        ) {
          freeRooms.push(room);
        } else {
          if (!isRent) {
            freeRooms.push(room);
          }
        }
      }
    });
    return freeRooms;
  };

  const generateFilteredList = filteredList().map((room) => (
    <div className={styles.roomOuterBox}>
      <div className={styles.roomBox}>
        <img src={getRoomPhoto(room)} />
        <div className={styles.roomTextBox}>
          <h2>Pokój nr{room.nr}</h2>
          <p>{room.opis}</p>
          <b>cena: {room.cena}zł</b>
        </div>
      </div>
      <button
        className={styles.rentButton}
        onClick={() => {
          if (buttonHandler) buttonHandler(room);
        }}
      >
        Rezerwuj
      </button>
    </div>
  ));

  const isCorrectScoope = (): boolean => {
    if (from && to) {
      const dateFrom = new Date(from).getTime();
      const dateTo = new Date(to).getTime();
      if (dateFrom > dateTo) return false;
      else return true;
    } else return true;
  };

  return (
    <div className={styles.outerBox}>
      {isCorrectScoope() ? (
        <>{mode === "all" ? generateList : generateFilteredList}</>
      ) : (
        <AlertLabel text="proszę podać poprawny zakres dat" />
      )}
    </div>
  );
};
export default RoomsColumnList;
