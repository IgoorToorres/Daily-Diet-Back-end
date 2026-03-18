// eslint-disable-next-line camelcase
export function formatDateTime(consumed_at: string | Date) {
  const dateObj = new Date(consumed_at)

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const year = dateObj.getFullYear()

  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}`,
  }
}
