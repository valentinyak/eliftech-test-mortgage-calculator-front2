import axios from 'axios';

axios.defaults.baseURL = 'https://powerful-garden-68470.herokuapp.com/api';

export const getBanks = () => {
  const banks = axios.get('/banks').then(response => response.data);

  return banks;
};
export const addBankToDB = bank => {
  const banks = axios.post('/banks', bank).then(response => response.data);

  return banks;
};
export const deleteBankFromDB = async bank => {
  await axios.delete(`/banks/${bank._id}`);
};
