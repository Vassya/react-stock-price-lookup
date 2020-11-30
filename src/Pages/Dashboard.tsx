import React, { CSSProperties, FC, forwardRef, memo, useState } from "react";
import classnames from "classnames";
import { Container, ItemsPlacements } from "Components/Inputs";
import { SearchBar } from "Components/SearchBar";
import { News } from "./News";
import "../App.css";
import { StockTable } from "./StockInfo";

interface DashboardProps {
  style?: CSSProperties;
  css?: string;
}

export const Dashboard: FC<DashboardProps> = memo(
  forwardRef(
    (props: DashboardProps, _forwardRef: React.Ref<React.ReactNode>) => {
      const { style, css } = props;
      
      const [symbol, setSymbol] = useState<string | undefined>(undefined);
      return (
        <>
          <header className={classnames("App-header", css)} style={style}>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            <h1>SIMPLISTIC STOCK MARKET PRICE LOOKUP</h1>
            <Container>
              <SearchBar onSelected={(sym) => setSymbol(sym)} />
            </Container>
          </header>
          <Container name="bodyCntr" itemsPlacement={ItemsPlacements.Horizontal}>
            <Container
              name="leftPanel"
              style={{ width: "50vw" }}
              itemsPlacement={ItemsPlacements.VerticalStack}
            >
              {symbol && <StockTable />}
            </Container>
            <Container
              name="rightPanel"
              style={{ width: "50vw" }}
              itemsPlacement={ItemsPlacements.VerticalStack}
            >
              {symbol && <News symbol={symbol} />}
            </Container>
          </Container>
        </>
      );
    }));

