import { useEffect } from "react";
import { useConser } from "../ContextProvider";
import EventList from "../compenents/EventList";

export default function Festival() {
  const { fetchFestival } = useConser();

  useEffect(() => {
    fetchFestival();
  }, []);

  return (
    <EventList
      title="Festival Etkinlikleri"
      fetchFunction={fetchFestival}
      eventType="festival"
    />
  );
}
