const useDate = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  
  const newDate = day + "." + month + "." + year;

  return newDate
}

export default useDate