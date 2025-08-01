import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

const BASE_URL = "http://localhost:9000";

type CityType = {
  id: number;
  cityName: string;
  emoji: string;
  date: string | number | Date;
  position: { lat: number; lng: number };
  notes?: string;
  country: string;
};

type State = {
  cities: CityType[];
  isLoading: boolean;
  currentCity: CityType | object;
  error: string;
};

type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityType[] }
  | { type: "city/loaded"; payload: CityType }
  | { type: "city/created"; payload: CityType }
  | { type: "city/deleted"; payload: number }
  | { type: "rejected"; payload: string };

type CitiesContextType = {
  cities: CityType[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  currentCity: CityType | {};
  error: string;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: Partial<CityType>) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }: { children: ReactNode }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: number) {
      if (Number(id) === (currentCity as CityType).id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [currentCity]
  );

  async function createCity(newCity: Partial<CityType>) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
export type { CityType  };
