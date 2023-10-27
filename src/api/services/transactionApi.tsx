import axios from 'axios';
import { BASE_URL } from './constants';

const transactionApi = axios.create({ baseURL: BASE_URL });

export default transactionApi;
