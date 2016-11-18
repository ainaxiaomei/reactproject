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

export async function deleteLocationRecord({id}){
  const data = id ;
  return request('/location/record/delete?' + "id=" + data ,
   {
    method: 'delete',
  });
}
export async function deleteRRecord(data){
  var array = data.key.split("-");
  return request('/location/rrecord/delete?' + "recordid=" + array[0] + "&data=" + array[1],
   {
    method: 'delete',
  });
}

export async function add(data){
  var json = JSON.stringify(data);
  return request('/location/record/addLocationRecord' ,
   {
    method: 'post',
    body:json,
    headers: {
    'Content-Type': 'application/json',
  },
  });
}

export async function addRRecord(data){
  console.log(data);
  var array = new Array();
  var records = data.ipList.split(";");
  for(let a of records){
    var res =  a.split(":");
    var object = new Object();
    object.weight = res[1];
    object.enabled = data.enabled;
    object.data = res[0];
    object.recordId = data.recordId;
    array.push(object);
  }
  var json = JSON.stringify(array);
  return request('/location/rrecord/add' ,
   {
    method: 'post',
    body:json,
    headers: {
    'Content-Type': 'application/json',
  },
  });
}
