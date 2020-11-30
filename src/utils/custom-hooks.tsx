import { useState, useEffect, useLayoutEffect, useRef } from "react";

export const useStateWithCallback = <T extends Object | undefined>(
  defaultValue?: T,
  synchronous?: boolean
) => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  const [callback, setCallback] = useState<Function | null>(null);

  const handler = () => {
    if (typeof callback === "function") {
      callback(value);
    }
    return () => {
      setCallback(null);
    };
  };

  useEffect(synchronous ? () => {} : handler, [value, callback]);

  useLayoutEffect(synchronous ? handler : () => {}, [value, callback]);

  const setValueWithCallback = (newValue: T, callback?: Function) => {
    if (typeof callback === "function") {
      setCallback(() => callback(newValue));
    }
    setValue(newValue);
  };

  // arrays won't be typed as arrays but as tuples.
  return [value, setValueWithCallback] as const;
};



export enum FetchStatus {
  idle = 0,
  fetching = 1,
  fetched = 2,
  error = 3,
}

// Note: Use axios?
export const useFetch = (url?: string) => {
  const cache = useRef({});
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.idle);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url || url.length == 0) return;

    const fetchData = async () => {
      setStatus(FetchStatus.fetching);
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setStatus(FetchStatus.fetched);
      } else {
        const response = await fetch(url);
        const data = await response.json();
        cache.current[url] = data; // set response in cache;
        setData(data);
        setStatus(FetchStatus.fetched);
      }
    };

    fetchData();
  }, [url]);

  return { status, data };
};