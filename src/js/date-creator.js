function createDate(date) {
  const fullDate = new Date(date);
  const day = fullDate.getDate();
  const month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();

  return `${day}.${month}.${year}`;
}

export default createDate;