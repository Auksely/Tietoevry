const getBusyDays = JSON.parse(localStorage.getItem('Busy')) || [];
const getTask = JSON.parse(localStorage.getItem('Task')) || [];

export { getBusyDays, getTask };