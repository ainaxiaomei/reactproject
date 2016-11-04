import request from '../utils/request';
import qs from 'qs';
export async function query(){
  return request('/iplibrary/iprange/getAll?page=1&rows=10');
}

export async function del({ipBeginStr,ipEndStr}){
  return request('/iplibrary/iprange/deleteip?' + qs.stringify({ipBeginStr,ipEndStr}) ,
   {
    method: 'delete',
  });
}
