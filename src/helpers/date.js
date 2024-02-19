const getStartWeekDate = (date) => {
  const dt = new Date(date);
  const currentDay = dt.getDay();
  const diff = dt.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  return new Date(dt.setDate(diff));
};

const convertStringDateToLocaleDate = (value) => {
  return new Date(value).toLocaleDateString();
};

const getWeekAsShortString = (value) => {
  return new Date(value).toLocaleDateString('en-us', {  weekday: 'short' });
};

export { getStartWeekDate, convertStringDateToLocaleDate, getWeekAsShortString };
