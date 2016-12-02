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

export async function addWithRegion(payload){
  var json = JSON.stringify(payload.data);
  return request('/location/record/'+ payload.path,
   {
    method: 'post',
    body:json,
    headers: {
    'Content-Type': 'application/json',
  },
  });
}

export async function addBatch(data){
  console.log(data);
  var json = JSON.stringify(data);
  return request('/location/record/addLocationRecordBatch' ,
   {
    method: 'post',
    body:json,
    headers: {
    'Content-Type': 'application/json',
  },
  });
}


export async function modifyRRecord(data){
  console.log(data);
  var key = data.key.split("-");
  var res =  data.ipList.split(":");
  var object = new Object();
  object.weight = res[1];
  object.enabled = data.enabled;
  object.data = res[0];
  object.recordId = key[0];
  var json = JSON.stringify(object);
  return request('/location/rrecord/update' ,
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

export async function addRRecordBatch(data){
  var query = new Array();
  for (let record of data.batch){
    var dataArray =  data.ipList.split(";");
    for(let a of dataArray){
      var res =  a.split(":");
      var object = new Object();
      object.enabled = data.enabled;
      object.recordId = record.id;
      object.data = res[0];
      object.weight = res[1];
      query.push(object);
    }

  }
  console.log(query);
  var json = JSON.stringify(query);
  return request('/location/rrecord/add' ,
   {
    method: 'post',
    body:json,
    headers: {
    'Content-Type': 'application/json',
  },
  });
}


export async function getFilteredRegions(){
  const url = '/iplibrary/region/getFilteredRegions'
  return request(url);

}
