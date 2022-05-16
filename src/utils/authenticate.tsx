import axios, {HeadersDefaults} from 'axios';
import {CONSTANT} from "./constant";

interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export const authenticate = async () => {
  const response = await axios.post(CONSTANT.CONTACT_API.TOKEN, JSON.stringify(CONSTANT.CONTACT_API.API_CREDENTIALS))
  return {
    'Authorization': `Bearer ${response.data.access_token}`,
  } as CommonHeaderProperties;
}