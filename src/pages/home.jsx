import '../css dosyaları/home.css'
import { useConser } from '../ContextProvider';
import { useEffect } from 'react';
import EventList from '../compenents/EventList';

export default function Home() {
  const { fetchConsers } = useConser();

  useEffect(() => {
    fetchConsers();
  }, []);

  return (
    <EventList
      title="Yaklaşan Etkinlikler"
      fetchFunction={fetchConsers}
      eventType="etkinlik"
    />
  );
}