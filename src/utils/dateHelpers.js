
// utils/dateHelpers.js
export function getRandomFutureDate() {
  const today = new Date();
  const futureDate = new Date(today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within next 30 days
  return futureDate;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}