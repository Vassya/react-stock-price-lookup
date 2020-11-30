import { useAppContext } from "AppContext";
import React, { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { FcBullish } from "react-icons/fc";

const TableWrapper = styled.div<any>`
  padding: 5px;
`;

const TableHeader = styled.header<any>`
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Table = styled.table<any>`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #8c8d96;
    color: white;
  }
`;

interface StockTableProps {
  symbol: string;
  interval?: string;
}

export const StockTable: FC<StockTableProps> = memo((props: StockTableProps) => {
    const { symbol, interval } = props;

  const { api } = useAppContext();
  
  const [quotes, setQuotes] = useState<any>(undefined);
  
    useEffect(() => {
      if (symbol) {
        api.GetStockChart(symbol, interval ?? "10d").then((resp) => {
          setQuotes(resp);
        });
      }
    }, [api, symbol]);

  return (
    <TableWrapper>
      <TableHeader>
        <FcBullish /> Stock Quotes (10 days)
      </TableHeader>
      <Table className="table">
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
          {quotes &&
            quotes.map((item, index) => {
              return item.change < 0 ? (
                <StockItem key={"stkItem" + index} {...item} stockIsUp />
              ) : (
                <StockItem key={"stkItem" + index} {...item} />
              );
            })}
        </tbody>
      </Table>
    </TableWrapper>
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