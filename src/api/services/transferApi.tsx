import axios from 'axios';
import { BASE_URL } from './constants';

const transferApi = axios.create({ baseURL: BASE_URL });

export default transferApi;
