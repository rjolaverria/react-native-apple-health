import React, { Dispatch } from 'react';

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

type DateContextType = {
  setStartDate: Dispatch<React.SetStateAction<Date>>;
  setEndDate: Dispatch<React.SetStateAction<Date>>;
  startDate: Date;
  endDate: Date;
};

const DateContext = React.createContext<DateContextType>({
  setStartDate: () => {},
  setEndDate: () => {},
  startDate: new Date(),
  endDate: new Date(),
});

const useDate = () => React.useContext(DateContext);

export { useDate, DateContext };

export const DateProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [startDate, setStartDate] = React.useState(startOfToday);
  const [endDate, setEndDate] = React.useState(endOfDay);

  const value = React.useMemo(
    () => ({ startDate, setStartDate, endDate, setEndDate }),
    [startDate, setStartDate, endDate, setEndDate]
  );

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export default DateContext;
