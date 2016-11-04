import request from '../utils/request';
import qs from 'qs';
export async function query(data){
  if(qs.stringify(data)){
      const url = '/iplibrary/iprange/getAll?' + qs.stringify(data) + '&page=1&rows=10';
      console.log(url);
      return request(url);
  }else{
    const url = '/iplibrary/iprange/getAll?' + qs.stringify(data) + 'page=1&rows=10';
    console.log(url);
    return request(url);
  }

}

export async function del({ipBeginStr,ipEndStr}){
  return request('/iplibrary/iprange/deleteip?' + qs.stringify({ipBeginStr,ipEndStr}) ,
   {
    method: 'delete',
  });
}
