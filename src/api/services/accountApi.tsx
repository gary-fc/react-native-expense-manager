import axios from 'axios/index';
import { BASE_URL } from './constants';

const accountApi = axios.create({ baseURL: BASE_URL });

export default accountApi;
