import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import LocationRecoedList from '../components/Location/LocationRecoedList';
import LocationRecordModal from '../components/Location/LocationRecordModal';
import RRecordModal from '../components/Location/RRecordModal';
import LocationSerach from '../components/Location/LocationSearch';
import DNSListModal from '../components/commom/DNSListModal';
const LocationRecordRouter = ({locationRecord,dispatch})=>{
  const {list,loading,total,current,modalVisible,currentItem,isp,regions,locationSearch,
    currentRRecordItem,locationRecordModalVisible,
    currentLocationRecordItem,locationRecordListAcionMode,locationRecordSelectedRows,dnsModalVisible,dnsList} = locationRecord;

  const locationRecordProps = {
    dataSource: list,
    loading:loading,
    total:total,
    current:current,
    locationRecordListAcionMode:locationRecordListAcionMode,
    locationRecordSelectedRows:locationRecordSelectedRows,
    onPageChange(page) {
      dispatch({
        type:'locationRecord/setCurrentPage',
        payload:{
          'page':page
        }
      }),
      dispatch({
        type:'locationRecord/query',
        payload:{
          'page':page
        }
      });
    },
    onAddLocationRecord:function(){
    dispatch({
      type:"locationRecord/showLocationRecordModal",
    });
  },
  onCloneLoactionRecord(record,state){
    dispatch({
      type:"locationRecord/showLocationRecordModal",
      payload:{
        type:"CLONE"
      }
    });
  },
  onDeleteLoactionRecord(record){
    console.log(record);
  },
  onSyncLoactionRecord(){
    dispatch({
      type:"locationRecord/showDNSModal",
    });
  },
  onAddRRecordBatch(record){
    let newRecord = record.filter((element)=>{
      return element.id && element.domain
    });
    dispatch({
      type:"locationRecord/showRRecordModal",
      payload:{
        'record':newRecord,
        'type' : "BATCH"
      }
    });
  },
  changeActionMode(mode,rows){

    dispatch({
      type: 'locationRecord/changeLocationRecordListActionMode',
      payload:{
        mode:mode,
        rows:rows
      }
    });
  },
  onDeleteDomain(record){
    dispatch({
      type: 'locationRecord/deleteDomain',
      payload:{
        record:record
      }
    });
  },
  onDeleteRecord(record){
    dispatch({
      type: 'locationRecord/deleteRecord',
      payload:{
        record:record
      }
    });
  },
  onDeleteItem(record) {
    dispatch({
      type: 'locationRecord/delete',
      payload:{
        record:record
      }
    });
  },
  onEditRecord(record){
    dispatch({
      type:"locationRecord/showRRecordModal",
      payload:{
        'record':record,
        'type':"EDIT"
      }

    });
  },
  onAddRecord(record){
    dispatch({
      type:"locationRecord/showRRecordModal",
      payload:{
        'record':record
      }

    });
  }
  };

  const locationRecodModalProps = {
    visible :locationRecordModalVisible,
    item :currentLocationRecordItem,
    isps:isp,
    regions:regions,
    onOk:function(data){
      if(currentLocationRecordItem.type == "CLONE"){
         var list = new Array();
         var ipList = new Array();
         var cloneArray = currentLocationRecordItem.data;

         var ips = data.ipList.split(";");
         for(let a of ips){
           var res =  a.split(":");
           var object = new Object();
           object.weight = res[1];
           object.enabled = true;
           object.data = res[0];
           ipList.push(object);
         }

         for (let record of cloneArray ){
             let object = new Object();
             object.domain = data.domain;
             object.country = record.country;
             object.province = record.province;
             object.continent = record.continent;
             object.isp = record.isp;
             object.type = record.type;
             if(ipList.length > 0){
                object.ipList = ipList;
             }else{
               object.ipList = record.ipList;
             }

             list.push(object);
         }
         dispatch({
           type:'locationRecord/createBatch',
           payload:list
         });
      }else{
        //处理GEO转化为洲国省
        var array = new Array();

        var records = data.ipList.split(";");
        for(let a of records){
          var res =  a.split(":");
          var object = new Object();
          object.weight = res[1];
          object.enabled = true;
          object.data = res[0];
          array.push(object);
        }
        data = {...data,"continent":data.geo[0],"country":data.geo[1],"province":data.geo[2],ipList:array,ips:data.ipList }
        dispatch({
          type:'locationRecord/create',
          payload:data
        });
      }

    },
    onCancel:function(){
      dispatch({
        type:'locationRecord/hideLocationRecordModal'
      })
    }
  }

  const RRecodModalProps = {
    visible :modalVisible,
    item :currentRRecordItem,
    onOk:function(data,type){
      if("EDIT" == type){
        dispatch({
          type:'locationRecord/modifyRRecord',
          payload:data
        })
      }else if("BATCH" == type){
        dispatch({
          type:'locationRecord/createRRecordBatch',
          payload:{...data,batch:currentRRecordItem.batch}
        })
      }else{
        dispatch({
          type:'locationRecord/createRRecord',
          payload:data
        })
      }

    },
    onCancel:function(){
      dispatch({
        type:'locationRecord/hideRRecordModal'
      })
    }
  }

  const locationSearchProps = {
   query : function(data) {


     dispatch({
       type:'locationRecord/query',
       payload:data
     });
    },
    changeCountryList:function(value){
      dispatch({
        type:'locationRecord/changeCountry',
        payload:value
      });
    },
    changeProvinceList:function(value){
      dispatch({
        type:'locationRecord/changeProvince',
        payload:value
      });
    },
    isps:isp,
    regions:regions,
    ipListSearch:locationSearch

  }

  const dnsModalProps = {
    visible :dnsModalVisible,
    dnsList:dnsList,
    onOk:function(data){
      if(data && data.length > 0){
        dispatch({
          type:'locationRecord/syncDns',
          payload:data
        });
      }
    },
    onCancel:function(){
      dispatch({
        type:'locationRecord/hideDNSModal'
      })
    }
  }
  const RRecordModalGen = ()=>{
    return (
       <RRecordModal {...RRecodModalProps}/>
    );
  }

  const LocationRecordModalGen = ()=>{
    return (
       <LocationRecordModal {...locationRecodModalProps}/>
    );
  }

  const DnsModalGen = ()=>{
    return (
       <DNSListModal {...dnsModalProps}/>
    );
  }
  return(
    <MainLayout DefaultSelect={["locationRecord"]} appName="调度管理">
    <LocationSerach {...locationSearchProps}/>
    <LocationRecoedList {...locationRecordProps}/>
     <RRecordModalGen />
     <LocationRecordModalGen />
     <DnsModalGen />
    </MainLayout>

  )
}

function mapStateToProps({ locationRecord }) {
  return { locationRecord };
}


export default connect(mapStateToProps)(LocationRecordRouter);
