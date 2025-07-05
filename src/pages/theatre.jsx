import { useEffect } from "react";
import { useConser } from "../ContextProvider"
import EventList from "../compenents/EventList";

export default function Theatre() {
  const { fetchTiyatros } = useConser();

  useEffect(() => {
    fetchTiyatros();
  }, [])

  return (
    <EventList
      title="Tiyatro Etkinlikleri"
      fetchFunction={fetchTiyatros}
      eventType="tiyatro"
    />
  );
}