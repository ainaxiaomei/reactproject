import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import LocationRecoedList from '../components/Location/LocationRecoedList';
import LocationRecordModal from '../components/Location/LocationRecordModal';
const LocationRecordRouter = ({locationRecord,dispatch})=>{
  const {list,loading,total,current,modalVisible,currentItem,isp,regions} = locationRecord;

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
      type:"locationRecord/showModal",
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
  };

  const locationRecodModalProps = {
    visible :modalVisible,
    item :currentItem,
    isps:isp,
    regions:regions,
    onOk:function(data){
      //处理GEO转化为洲国省
      data = {...data,"continent":data.geo[0],"country":data.geo[1],"province":data.geo[2]}
      dispatch({
        type:'locationRecord/create',
        payload:data
      });
    },
    onCancel:function(){
      dispatch({
        type:'locationRecord/hideModal'
      })
    }
  }

  const IpListModalGen = ()=>{
    return (
       <LocationRecordModal {...locationRecodModalProps}/>
    );
  }
  return(
    <MainLayout DefaultSelect={["locationRecord"]} appName="调度管理">
    <LocationRecoedList {...locationRecordProps}/>
     <IpListModalGen />
    </MainLayout>

  )
}

function mapStateToProps({ locationRecord }) {
  return { locationRecord };
}


export default connect(mapStateToProps)(LocationRecordRouter);
