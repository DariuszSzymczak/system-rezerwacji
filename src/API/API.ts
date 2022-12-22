import { db } from "@/App";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export type Room = {
  cena: number;
  czy_posprzatany: boolean;
  id: string;
  nr: number;
  opis: string;
};
export type Photo = { nr_pokoj: number; path: string; id: string };
export type Reservation = {
  id?: number;
  nr_pokoj: number;
  od: string;
  do: string;
  email: string;
  imie: string;
  nazwisko: string;
  tel: string;
};

export class Api {
  getRoomsList: () => Promise<Room[]> = async () => {
    let data: Room[] = [];
    const roomsRef = collection(db, "pokoje");
    const docsSnap = await getDocs(roomsRef);
    docsSnap.forEach((doc) => {
      data.push(doc.data() as Room);
    });
    return data;
  };

  getPhotosList: () => Promise<Photo[]> = async () => {
    let data: Photo[] = [];
    const roomsRef = collection(db, "zdjecia");
    const docsSnap = await getDocs(roomsRef);
    docsSnap.forEach((doc) => {
      data.push(doc.data() as Photo);
    });
    return data;
  };

  getReservationsList: () => Promise<Reservation[]> = async () => {
    let data: Reservation[] = [];
    const roomsRef = collection(db, "rezerwacje");
    const docsSnap = await getDocs(roomsRef);
    docsSnap.forEach((doc) => {
      const tempReservation = {
        ...doc.data(),
        id: doc.id,
      } as unknown as Reservation;
      data.push(tempReservation as Reservation);
    });
    return data;
  };

  sendReservation = async (data: Reservation) => {
    const roomsRef = collection(db, "rezerwacje");
    const docRef = await addDoc(roomsRef, data);
    return docRef.id;
  };

  deleteReservation = async (reservation: Reservation) => {
    deleteDoc(doc(db, "rezerwacje", reservation.id + ""));
  };
}

export default new Api();
