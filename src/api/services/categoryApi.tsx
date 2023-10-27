import axios from 'axios';
import { BASE_URL } from './constants';

const categoryApi = axios.create({ baseURL: BASE_URL });

export default categoryApi;
