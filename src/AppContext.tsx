import React, { FC } from 'react';
import ApiCalls from 'api';
import devWarning from 'utils/utils';

export interface IAppContext {
  readonly useDarkTheme?: boolean;
  readonly routes: any[];
  readonly api: ApiCalls;
}

export const AppContext = React.createContext<IAppContext>(undefined as any);

export const AppProvider: FC<IAppContext> = React.memo((props) => {
    const { children, ...rest } = props;

    return (
        <AppContext.Provider
            value={{
                //...context,
                ...rest,
                useDarkTheme: false,
            }}
        >
            {children}
        </AppContext.Provider>
    );
});

export function useAppContext() {
    const ctx = React.useContext(AppContext);

    devWarning(
      !!ctx,
      `App context is undefined, please verify you are calling useAppContext() as a child component.`
    );

    return ctx;
}