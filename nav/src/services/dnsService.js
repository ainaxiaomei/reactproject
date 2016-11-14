import request from '../utils/request';
import qs from 'qs';
export async function queryDns(data){
  const url = '/location/dnsserver/getAll?';
  return request(url);
}

export async function syncDns(data){
   console.log(data);
   for(let i = 0; i < data.length ; i++){
       const url = '/location/dnsserver/syncip?host=' + data[i].host;
       request(url);
   }

  return
}
