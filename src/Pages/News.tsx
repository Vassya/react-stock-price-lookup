import { useAppContext } from "AppContext";
import { ListItem } from "Components/ListItem";
import { Spinner } from "Components/Spinner";
import React, { FC, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { FcNews } from "react-icons/fc";

export interface NewsProps {
  symbol: string; 
  interval?: string;
}

const NewsArticleContainer = styled.div<any>`
  margin-top: 5px;
  position: relative;
`;

const NewsArticleImage = styled.img<any>`
  min-width: 80px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  margin-right: 20px;
  max-width: 80px;
`;

const NewsHeader = styled.header<any>`
  margin-top: 5px;
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
`;

const NoNews = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 100%;
  h3 {
    width: auto;
  }

  svg {
    width: 30%;
    height: 30%;
    fill: #5eb5f8;
  }
`;

// the sandbox gives broken image url(s).
const defaultNewsUrl = "https://cloud.iexapis.com/v1/news/image/4f3aef27-7e43-475a-bcec-f9efeae26718";

export const News: FC<NewsProps> = memo((props: NewsProps) => {
  const { symbol, interval } = props;
  const [isLoading] = useState<boolean>(false);
  const [news, setNews] = useState<Stock.IStockNews[] | undefined>(undefined);

  const { api } = useAppContext();
    
  // on after mount and on update.
  useEffect(() => {
    if (symbol) {
      api.GetNewsBy(symbol, interval ?? "3").then((resp) => {
        setNews(resp);
      });
    }
  }, [api, symbol, interval]);

  return (
    <NewsArticleContainer>
      <NewsHeader>
        <FcNews /> Latest News
      </NewsHeader>
      {news &&
        news.map((obj, idx) => {
          return (
            <a
              href={obj.url}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
            >
              <ListItem
                key={"li_" + idx}
                index={idx}
                image={
                  <NewsArticleImage src={defaultNewsUrl} alt="news image" />
                }
                preTitle={new Date(obj.datetime).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                title={obj.headline}
                description={obj.summary}
              />
            </a>
          );
        })}
      {news && news.length === 0 && !isLoading && (
        <NoNews>
          <svg
            enableBackground="new 0 0 512 512"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="m60 272h332v-152h-332zm30-122h272v92h-272z" />
              <path d="m60 302h151v30h-151z" />
              <path d="m60 362h151v30h-151z" />
              <path d="m241 452h151v-150h-151zm30-120h91v90h-91z" />
              <path d="m60 422h151v30h-151z" />
              <path d="m60 0v60h-60v407c0 24.813 20.187 45 45 45h421.979c.172 0 .345-.001.518-.003 24.584-.268 44.503-20.351 44.503-44.997v-467zm-15 482c-8.271 0-15-6.729-15-15v-377h392v377c0 5.197.87 10.251 2.543 15zm437-15c0 8.174-6.571 14.841-14.708 14.997-4.094.084-7.857-1.43-10.75-4.244-2.929-2.85-4.542-6.669-4.542-10.753v-407h-362v-30h392z" />
            </g>
          </svg>
          <h3>Sorry, we couldn't find any related news.</h3>
        </NoNews>
      )}
      {isLoading && <Spinner />}
    </NewsArticleContainer>
  );
});