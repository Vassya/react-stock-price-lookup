declare namespace Stock {
    export interface IUser {
        Id: number;
        Name: string;
        isAdmin?: boolean;
    }

    export interface INameValue {
        name: string;
        value?: any;
    }

    interface IStockData {
        symbol: string;
        price: number; // decimal.
        interval: Date,
        socialMediaCounts: number;
    }

    interface IStockNews {
        datetime: number;
        headline: string;
        summary: string;
        source: string,
        url: string,
        image: string;
        lang: string;
    }
}
