function convertDate(date: string | Date | number) {
  const newDate = new Date(date);
  return `${newDate.getHours()}:${newDate.getMinutes()}`;
}

export default convertDate;
