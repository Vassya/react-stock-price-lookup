import mock from '../mock';

mock.onGet('/api/players').reply((config: any) => {
    const filter: string = config.params.filter;

    if (filter && filter.length > 0) {
        const players = filterMap(STOCK_SYM, (_v: string, k: string) => { return k.toLowerCase().startsWith(filter.toLowerCase()) });
        if (players.size > 0) {
            return [200, mapToObjectArray(players)];
        }
        return [200, []];
    }

    return [200, mapToObjectArray(STOCK_SYM)];
});

mock.onGet('/api/price').reply((request) => {
    const data: Stock.IStockData = {
        symbol: STOCK_SYM[request.name],
        price: getRandomNumber(100, 1100),
        interval: getRandomDate(new Date(2015, 0, 1), new Date()),
        socialMediaCounts: getRandomNumber(3, 11)
    }
    return [200, data];
});

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function mapToObjectArray(dic: ReadonlyMap<any, any>): Object {
    return Array.from(dic, ([name, value]) => ({ name, value }));
};

// Filter the given map by predicate.
export function filterMap<T>(dic: ReadonlyMap<string, T>, predicate?: Function): Map<string, T> {
    const clone = new Map<string, T>();

    if (dic && dic.size > 0) {
        dic.forEach((v, k) => {
            if (predicate && predicate(v, k)) {
                clone.set(k, v);
            }
        });
    }

    return clone;
};

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = (str: string) =>  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function getSuggestions(items: string[], value: string): string[] {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (!escapedValue || escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return items.filter((s) => regex.test(s));
};

const STOCK_SYM: ReadonlyMap<string, string> = new Map<string, string>([
    ["Amazon Inc", "AMZN"],
    ["Apple Inc", "AAPL"],
    ["Tesla Inc", "TSLA"],
    ["Netflix Inc", "NFLX"],
    ["Facebook Inc", "FB"],
    ["Microsoft Inc", "MSFT"],
    ["Alphabet Inc", "GOOGL"]
]);