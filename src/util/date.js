export function getFormattedDate(date) {
  // return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return date.toISOString().slice(0, 10) // ini output ISOString saja "2023-04-09T13:31:48.532Z" diberi slice buat ngmabil sampai tahun saja
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}