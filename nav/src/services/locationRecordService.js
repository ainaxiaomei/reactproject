import request from '../utils/request';
import qs from 'qs';
export async function queryLocationRecord(data){
  if(qs.stringify(data)){
      const url = '/location/record/getAll?' + qs.stringify(data) + '&page=1&rows=10';
      return request(url);
  }else{
    const url = '/location/record/getAll?' + qs.stringify(data) + 'page=1&rows=10';
    return request(url);
  }

}

export async function deleteLocationRecord({domain,country,province,isp,type}){
  const data = {domain,country,province,isp,type}
  return request('/location/record/delete?' + qs.stringify(data) ,
   {
    method: 'delete',
  });
}

export async function addLocationRecord(data){
  let json = JSON.stringify(data)
  return request('/iplibrary/iprange/addip',
   {
    method: 'put',
    body:json,
    headers: {
    'Content-Type': 'application/json',
  },
});}
