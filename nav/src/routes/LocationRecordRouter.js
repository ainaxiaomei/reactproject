import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import LocationRecoedList from '../components/Location/LocationRecoedList';
import LocationRecordModal from '../components/Location/LocationRecordModal';
import RRecordModal from '../components/Location/RRecordModal';
import LocationSerach from '../components/Location/LocationSearch';
const LocationRecordRouter = ({locationRecord,dispatch})=>{
  const {list,loading,total,current,modalVisible,currentItem,isp,regions,locationSearch,
    currentRRecordItem,locationRecordModalVisible,currentLocationRecordItem} = locationRecord;

  const locationRecordProps = {
    dataSource: list,
    loading:loading,
    total:total,
    current:current,
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
    onAddClick:function(){
    dispatch({
      type:"locationRecord/showLocationRecordModal",
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
    onOk:function(data){
      dispatch({
        type:'locationRecord/createRRecord',
        payload:data
      })
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

  return(
    <MainLayout DefaultSelect={["locationRecord"]} appName="调度管理">
    <LocationSerach {...locationSearchProps}/>
    <LocationRecoedList {...locationRecordProps}/>
     <RRecordModalGen />
     <LocationRecordModalGen />
    </MainLayout>

  )
}

function mapStateToProps({ locationRecord }) {
  return { locationRecord };
}


export default connect(mapStateToProps)(LocationRecordRouter);
