import { useEffect } from "react";
import { useConser } from "../ContextProvider";
import EventList from "../compenents/EventList";

export default function Standup() {
  const { fetchStandUp } = useConser();

  useEffect(() => {
    fetchStandUp();
  }, [])

  return (
    <EventList
      title="Stand-up Etkinlikleri"
      fetchFunction={fetchStandUp}
      eventType="stand-up"
    />
  );
}