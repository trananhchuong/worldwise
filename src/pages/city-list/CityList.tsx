import styles from "./CityList.module.css";
import { useCities } from "../../contexts/CitiesContext";
import Spinner from "../../components/spinner/Spinner";
import Message from "../../components/message/Message";
import CityItem from "../../components/city-item/CityItem";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
