import axios from "axios";

export default class ApiCalls {
    private readonly apiUrl: string;    
    // @ts-ignore
    private readonly user?: Stock.IUser;
    // sandbox token.
    private readonly token = "Tpk_e15aa8f327cc452c98ad695ea9d317fe";
    //private readonly token? = process.env.STOCK_SANDBOX_API_TOKEN;

    constructor(baseUrl: string, user?: Stock.IUser) {
        this.apiUrl = baseUrl;
        this.user = user;
    }

    public async GetStockPlayers(filter?: string): Promise<Stock.INameValue[]> {
        return axios.get('/api/players', {
            params: { filter }
        }).then((res) => {
            return res.data;
        })
        .catch ((e) => console.log("Stock error GetStockPlayers  : ", { e }));        
    }

    public async GetStockBySymbol(symbol: string): Promise<Stock.IStockData> {
        const stk = await axios({
            method: "get",
            baseURL: this.apiUrl,
            url: `/api/price/${symbol}?token=${this.token}`,
            responseType: "json"
        });

        return stk.data;
    }

    public async GetNewsBy(symbol: string, interval: string): Promise<any> {
        const stk = await axios({
            method: "get",
            baseURL: this.apiUrl,
            url: `/stock/${symbol}/news/last/${interval}?token=${this.token}`,
            responseType: "json"
        });

        return stk.data;
    }

    public async GetStock(symbol: string): Promise<any> {
        const stk = await axios({
            method: "get",
            baseURL: this.apiUrl,
            url: `/stock/${symbol}/quote?displayPercent=true&token=${this.token}`,
            responseType: "json"
        });

        return stk.data;
    }
}