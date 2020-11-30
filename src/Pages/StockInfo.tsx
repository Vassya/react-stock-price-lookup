import React, { FC, memo } from "react";

interface StockTableProps {
    quotes?: any[];
}

export const StockTable: FC<StockTableProps> = memo((props: StockTableProps) => {
    const { quotes } = props;

   return (<div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Open</th>
              <th scope="col">High</th>
              <th scope="col">Low</th>
              <th scope="col">Close</th>
            </tr>
          </thead>
          <tbody>
            {quotes && quotes.map((item, index) => {
              return item.change < 0 ? (
                <StockItem key={"stkItem" + index} {...item} stockIsUp />
              ) : (
                <StockItem key={"stkItem" + index} {...item} />
              );
            })}
          </tbody>
        </table>
      </div>
    );      
});

interface StockItemProps {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    stockIsUp: boolean;
}

export const StockItem: FC<StockItemProps> = memo((props: StockItemProps) => {
  const { date,
    open,
    high,
    low,
    close,
    stockIsUp,
  } = props;

  return (
    <tr>
      <th scope="row">{date}</th>
      <td>{open}</td>
      <td>{high}</td>
      <td>{low}</td>
      <td className={!!stockIsUp ? "text-success" : "text-danger"}>
        {!!stockIsUp
          ? String.fromCharCode(9650) + " " + close
          : String.fromCharCode(9660) + " " + close}
      </td>
    </tr>
  );
});