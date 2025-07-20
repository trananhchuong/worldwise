import styles from "./CountryItem.module.css";

interface Country {
  emoji: string;
  country: string;
};

interface CountryItemProps  {
  country: Country;
}

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
