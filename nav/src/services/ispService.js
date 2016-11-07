import request from '../utils/request';
import qs from 'qs';
export async function queryIsp(data){
  const url = '/location/isp/getAll?';
  return request(url);
}
