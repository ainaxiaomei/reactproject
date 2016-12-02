import request from '../../utils/request';
import {queryRegion} from '../../services/ipRangeService.js';
import {add,addWithRegion,queryLocationRecord,deleteLocationRecord,deleteRRecord,addRRecord,modifyRRecord,addRRecordBatch,addBatch,getFilteredRegions} from '../../services/locationRecordService.js';
import {queryIsp} from '../../services/ispService.js';
import {queryDns,syncDnsDomain} from '../../services/dnsService.js';
import { Modal} from 'antd';

export default {

  namespace: 'locationRecord',

  state: {
    list: [],
    loading: false,
    total: 0,
    current: 1,
    currentItem: {},
    currentLocationRecordItem:{},
    currentRRecordItem:{},
    modalVisible: false,
    locationRecordModalVisible:false,
    locationRecordListAcionMode:"",
    locationRecordSelectedRows:[],
    modalType: 'create',
    isp:[],
    regions:[{
  value: 'AS',
  label: '亚洲',
  children: [{
    value: 'CN',
    label: '中国',
    children: [{
      value: 'SH',
      label: '上海',
    },{
      value: {type:'region',value:'HD'},
      label: '华东',
    }],
  }],
},
{
  value: 'NA',
  label: '北美洲',
  children: [{
    value: 'US',
    label: '美国',
    children: [{
      value: 'HS',
      label: '华盛顿洲',
    }],
  }],
},{
value: '',
label: '默认',
},],
    locationSearch:{
      continent:[],
      country:[],
      province:[],
    },
    enableRRecordSelect :false,
    dnsModalVisible: false,
    dnsList:{},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/location') {
          //刷新表格
          dispatch({
            type: 'query',
            payload: {},
          });

          //查询ips静态数据
          dispatch({
            type: 'queryIsps',
            payload: {},
          });

          // //查询区域
          // dispatch({
          //   type: 'queryRegions',
          //   payload: {},
          // });

          //查询dns
          dispatch({
            type: 'queryDns',
            payload: {},
          });
        }
      });
    },
  },


  effects:{
    *query({ payload }, { select, call, put }) {
       yield put({ type: 'showLoading' });
       //清空数据
       yield put({type: 'clearList'});
      const result = yield call(queryLocationRecord,payload);
       if (!result.err) {
         yield put({
           type: 'querySuccess',
           payload: result.data
         });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'QueryLocation Error ! \n' + "Error Message :" +result.msg.exception ,
          });
          yield put({ type: 'hideLoadind' });
       }
     },
     *queryRegions({ payload }, { select, call, put }){
      const result =  yield call(getFilteredRegions);
      if(!result.err){
        yield  put({
          type:'queryregionSuccess',
          payload:result
        });
      }else{
        Modal.error({
           title: 'This is an error message',
           content: 'QueryRegion Error ! \n' + "Error Message :" + result.msg.exception ,
         });
      }

    },
     *queryIsps({ payload }, { select, call, put }){
       const result = yield call(queryIsp);
       if(!result.err){
         yield put({
           type: 'queryIspSuccess',
           payload: result.data
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'QueryIsp Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
     *queryDns({ payload }, { call, put }){
       const result =  yield call(queryDns,{});
       if (!result.err) {
         yield put({
           type: 'queryDnsSuccess',
           payload: result
         });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'QueryDns Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
     *delete({ payload }, { select, call, put }){
      const result = yield call(deleteLocationRecord,payload.record);
      if (!result.err) {
        yield put({
          type: 'query',
         });
      }else{
        Modal.error({
           title: 'This is an error message',
           content: 'Delete Error ! \n' + "Error Message :" + result.msg.exception ,
         });
      }
     },
     *deleteDomain({ payload }, { select, call, put }){
       const result = yield call(deleteLocationRecord,payload.record);
       console.log(result);
       if (!result.err) {
         yield put({
           type: 'query',
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'DeleteDomain Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
     *deleteRecord({ payload }, { select, call, put }){
       const result = yield call(deleteRRecord,payload.record);
       if (!result.err) {
         yield put({
           type: 'query',
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'DeleteRecord Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }

     },
     *create({ payload }, { call, put }) {
       yield put({ type: 'hideLocationRecordModal' });
      const result = yield call(add,payload);
      if (!result.err) {
        yield put({
          type: 'query',
         });
      }else{
        Modal.error({
           title: 'This is an error message',
           content: 'Create Error ! \n' + "Error Message :"  + result.msg.exception ,
         });
      }
     },
     *createWithRegion({ payload }, { call, put }) {
       yield put({ type: 'hideLocationRecordModal' });
      const result = yield call(addWithRegion,payload);
      if (!result.err) {
        yield put({
          type: 'query',
         });
      }else{
        Modal.error({
           title: 'This is an error message',
           content: 'Create Error ! \n' + "Error Message :"  + result.msg.exception ,
         });
      }
     },
     *createBatch({ payload }, { call, put }){
       yield put({ type: 'hideLocationRecordModal' });
       const result = yield call(addBatch,payload);
       if (!result.err) {
         yield put({
           type: 'query',
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'CreateBatch Error ! \n' + "Error Message :"  + result.msg.exception,
          });
       }
     },
     *createRRecord({ payload }, { call, put }) {
       yield put({ type: 'hideRRecordModal' });
       const result = yield call(addRRecord,payload);
       if (!result.err) {
         yield put({
           type: 'query',
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'CreateRRecord Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
     *createRRecordBatch({ payload }, { call, put }){
       yield put({ type: 'hideRRecordModal' });
       const result = yield call(addRRecordBatch,payload);
       if (!result.err) {
         yield put({
           type: 'query',
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'CreateRRecordBatch Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
     *modifyRRecord({ payload }, { call, put }){
       yield put({ type: 'hideRRecordModal' });
       const result = yield call(modifyRRecord,payload);
       if (!result.err) {
         yield put({
           type: 'query',
          });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'ModifyRRecord Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
     *syncDns({ payload }, { call, put }){
       const result = yield call(syncDnsDomain,payload);
       if (!result.err) {
         yield put({
           type:'hideDNSModal',
         });
       }else{
         Modal.error({
            title: 'This is an error message',
            content: 'SyncDns Error ! \n' + "Error Message :" + result.msg.exception ,
          });
       }
     },
  },

reducers:{
  /**
     =============================DNS相关===========================
  */
  hideDNSModal(state){
    return { ...state,dnsModalVisible: false };
  },
  showDNSModal(state){
    return { ...state,dnsModalVisible: true };
  },
  queryDnsSuccess(state,action){
    if(action.payload.data.data){
      for(let a of action.payload.data.data){
        if(a.enabled){
          a.enabled = "true";
        }else{
          a.enabled = "false";
        }
      }
    }
    return {...state,dnsList:action.payload.data};
  },

  toggleRRecordSelect(state,action){


    return {...state,enableRRecordSelect:!state.enableRRecordSelect};
  },
  querySuccess(state,action){
    /*
       let result = action.payload.data;
       var objArray = new Array();

       for (let a of result){

         let domainArray =a.domain.split(".");
         let domain = domainArray[domainArray.length-2] + "." + domainArray[domainArray.length-1];
         var host = "";

         for (var i = 0 ; i < domainArray.length-2 ;i++){
           if( i ==  domainArray.length-3){
             host = host + domainArray[i] ;
           }else{
             host = host + domainArray[i] + "." ;
           }
         }

         if(!host){
           host = '@';
         }
         var obj = new Object();
         obj.domain = domain;
         obj.key = domain ;

         var array = new Array();
         for( var i = 0 ; i < a.ipList.length; i++  ){
          var childObj = new Object();
          childObj.host = host ;
          childObj.key =  a.ipList[i].recordId
          childObj.data = a.ipList[i].data;
          childObj.type = a.type;
          childObj.country = a.country;
          childObj.continent = a.continent;
          childObj.province = a.province;
          childObj.isp = a.isp;
          array.push(childObj);
         }

         obj.children = array;
         objArray.push(obj);
       }

       //合并数组
      var map = new Map();
      for (var a of objArray) {
        var pre = map.get(a.domain);
        if(pre){
          for(var i = 0 ; i < a.children.length ; i++ ){
            pre.children.push(a.children[i]);
          }

        }else{
          map.set(a.domain,a);
        }
      }

      var newArray = Array();
        for(let value of map.values()){
          newArray.push(value);
        }

      //  console.log(action.payload.data);
      */

         let result = action.payload.data;
         var objArray = new Array();

          for (var i = 0 ;i < result.length ; i++){
           var obj = new Object();
           obj.domain = result[i].domain;
           obj.key = result[i].domain + i;
           obj.countryText = result[i].countryText;
           obj.country = result[i].country;
           obj.continent = result[i].continent;
           obj.province = result[i].province;
           obj.id = result[i].id;
           obj.continentText = result[i].continentText;
           obj.provinceText = result[i].provinceText;
           obj.isp = result[i].isp;
           obj.type = result[i].type;
           obj.data= "-";
           obj.weight= "-";
           obj.enable= "-";
           var array = new Array();
           for( var j = 0 ; j < result[i].ipList.length; j++  ){
            var childObj = new Object();
            childObj.key =  result[i].ipList[j].recordId + "-" + result[i].ipList[j].data
            childObj.data = result[i].ipList[j].data;
            childObj.weight =  result[i].ipList[j].weight >= 0 ? result[i].ipList[j].weight : 0;
            childObj.enable = result[i].ipList[j].enabled == true ? "true" : "false";
            array.push(childObj);
           }

           obj.children = array;
           objArray.push(obj);
         }
        //  console.log(action.payload.data);
       return {...state, list:objArray, loading: false,total:action.payload.total};
  },
  deleteSuccess(state,action){
    const newList = state.list.filter((item)=>{
      return (item.ipBegin != action.payload.ipBegin && item.ipEnd != action.payload.ipEnd)
    })
    return {...state,list:newList}
  },
  createSuccess(state,action){
    const newIpRange = action.payload;
    state.list.push(newIpRange);
    return {...state,list:state.list.slice(0,10),total:state.total+1};
  },
  queryIspSuccess(state,action){
     return {...state,isp:action.payload.data};
  },
  queryregionSuccess(state,action){
     return {...state,regions:action.payload.data};
  },
  changeCountry(state,action){
    const data = state.regions.filter((item)=>{
      return (item.value == action.payload);
    });
    var countryList = data[0].children;
    if(!countryList){
      countryList=[];
    }
    return {...state,locationSearch:{...state.locationSearch,country:countryList,province:[]}};
  },
  changeProvince(state,action){
   const data =  state.locationSearch.country.filter((item)=>{
        return (item.value == action.payload);
    });
    var provinceList = data[0].children;
    if(!provinceList){
      provinceList=[];
    }
     return {...state,locationSearch:{...state.locationSearch,province:provinceList}};
  },
  //显示新增对话框
  showRRecordModal(state,action){
    if("EDIT" == action.payload.type){
        return {...state,modalVisible:true,currentRRecordItem:{enabled:action.payload.record.enabled,type:"EDIT",key:action.payload.record.key,ipList:action.payload.record.data + ":" + action.payload.record.weight}};
    }else if ("BATCH" == action.payload.type){
        return {...state,modalVisible:true,currentRRecordItem:{batch:action.payload.record,type:"BATCH"}};
    }else{
      return {...state,modalVisible:true,currentRRecordItem:{recordId:action.payload.record.id}};
    }

  },
  //隐藏新增对话框
  hideRRecordModal(state) {
    //清空currentItem
    return { ...state,currentItem:{},modalVisible: false };
  },

  showLocationRecordModal(state,action){
      if(action.payload && action.payload.type == "CLONE"){
        return {...state,locationRecordModalVisible:true,currentLocationRecordItem:{type:"CLONE",data:state.locationRecordSelectedRows}};
      }else{
        return {...state,locationRecordModalVisible:true};
      }

  },
  hideLocationRecordModal(state,action){
      return {...state,locationRecordModalVisible:false,currentLocationRecordItem:{}};
  },
  changeLocationRecordListActionMode(state,action){
    var rows = action.payload.rows
    if(rows){
      for (let record of rows){
         for(let data of state.list){
            if(record.id == data.id){
              record.ipList = data.children;
              break;
            }
         }

      }
    }

    return {...state,locationRecordListAcionMode:action.payload.mode,locationRecordSelectedRows:action.payload.rows};
  },
    //隐藏加载动画效果
  hideLoadind(state){
    return {...state,loading:false}
  },
  //显示加载效果
  showLoading(state) {
    return { ...state, loading: true };
  },
  //清空列表
  clearList(state){
      return {...state,list:[]}
  },
  //设置当前的页数
  setCurrentPage(state,action){
    return {...state,current:action.payload.page}
  }
}

};
