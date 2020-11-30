import React, { FC, forwardRef, memo, useState } from "react";
import Autosuggest from "react-autosuggest";
import { useStateWithCallback } from "utils/custom-hooks";
import { FaSearchDollar } from "react-icons/fa";

import { Input } from "./Inputs";
import "./Searchbar.css";
import { useAppContext } from "AppContext";
import { Spinner } from "./Spinner";

/*const enum LoadStatus {
  None = 0,
  Loading = 1,
  Loaded = 2
}*/

interface RenderSuggestionParams {
        query: string;
        isHighlighted: boolean;
}

interface SuggestionSelectedEventData {
        suggestionValue: string;
        suggestionIndex: number;
        method: 'click' | 'enter';
}
    
interface ChangeEvent {
        newValue: string;
        method: 'down' | 'up' | 'escape' | 'enter' | 'click' | 'type';
}
    
const getSuggestionValue = (suggestion: any): string => suggestion.value;

const renderSuggestion = (suggestion: any, _params: RenderSuggestionParams): React.ReactNode => {
  return (
    <div>
      <h5>{suggestion.name}</h5>
      <label>({suggestion.value})</label>
    </div>
  );
}

interface SearchBarProps {
  style?: React.CSSProperties;
  onSelected?: (symbol: string) => void;
}

export const SearchBar: FC<SearchBarProps> = memo(forwardRef(
  (props: SearchBarProps, forwardRef: React.Ref<HTMLInputElement>) => {
    const { api } = useAppContext();
    const { style, onSelected: onUpdate } = props;

    const [value, setValue] = useState<string | undefined>(undefined);
    const [isLoading, setLoadingWith] = useStateWithCallback<boolean>(false);
    const [suggestions, setSuggestions] = useState<Stock.INameValue[]>([]);

    const ref = forwardRef || React.createRef<HTMLInputElement>();
    console?.log(ref);

    const onChange = (_ev: React.ChangeEvent<HTMLInputElement>, params: ChangeEvent) => {
      setValue(params.newValue);
    };

    const onBlur = () => {
      if (!value || value === "") {
        // clear the previos results.
        onUpdate && onUpdate("");
      }
    };

    const onSuggestionSelected = (
      _ev: React.FormEvent<any>,
      data: SuggestionSelectedEventData
    ) => {
      onUpdate && onUpdate(data.suggestionValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
      setLoadingWith(true, () => {
        api.GetStockPlayers(value).then((players) => {
          players && setSuggestions(players);
          setLoadingWith(false);
        });
      });
    };

    const onSuggestionsClearRequested = () => {
      setSuggestions([]);
    };

    const inputProps = {
      placeholder: value ? "Selected player:" : "Please enter a symbol...",
      value: value ?? "",
      onChange: onChange,
      onBlur: onBlur,
    };

    return (
      <div style={style}>
        {isLoading && <Spinner />}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionSelected={onSuggestionSelected}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          renderInputComponent={(inputProps: any) => {
            return (
              <Input
                {...inputProps}
                trailingIcon={
                  <FaSearchDollar
                    size="1em"
                    style={{
                      paddingLeft: "5px",
                      cursor: "pointer",
                      alignSelf: "center",
                    }}
                  />
                }
              />
            );
          }}
        />
      </div>
    );
  }));
