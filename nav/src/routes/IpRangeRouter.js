import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import IpList from '../components/IpRange/IpList';
import IpListModal from '../components/IpRange/IpListModal';
import IpSearch from '../components/IpRange/IpSearch';
const IpRangeRouter = ({ipRange,dispatch})=>{

  const {list,loading,total,current,modalVisible,currentItem,isp,regions,ipListSearch} = ipRange;

  const ipListProps = {
    dataSource: list,
    loading:loading,
    total:total,
    current:current,
    onPageChange(page) {
      dispatch({
        type:'ipRange/setCurrentPage',
        payload:{
          'page':page
        }
      }),
      dispatch({
        type:'ipRange/query',
        payload:{
          'page':page
        }
      });
    },
    onAddClick:function(){
    dispatch({
      type:"ipRange/showModal",
    });
  },
  onDeleteItem(record) {
    dispatch({
      type: 'ipRange/delete',
      payload:{
        record:record
      }
    });
  },
  };


  const ipListModalProps = {
    visible :modalVisible,
    item :currentItem,
    isps:isp,
    regions:regions,
    onOk:function(data){
      //处理GEO转化为洲国省
      data = {...data,"continent":data.geo[0],"country":data.geo[1],"province":data.geo[2]}
      dispatch({
        type:'ipRange/create',
        payload:data
      });
    },
    onCancel:function(){
      dispatch({
        type:'ipRange/hideModal'
      })
    }
  }

 const IpListModalGen = ()=>{
   return (
      <IpListModal {...ipListModalProps}/>
   );
 }

 const IpSearchProps = {
  query : function(data) {
    dispatch({
      type:'ipRange/query',
      payload:data
    });
   },
   changeCountryList:function(value){
     dispatch({
       type:'ipRange/changeCountry',
       payload:value
     });
   },
   changeProvinceList:function(value){
     dispatch({
       type:'ipRange/changeProvince',
       payload:value
     });
   },
   isps:isp,
   regions:regions,
   ipListSearch:ipListSearch

 }

  return(
    <MainLayout DefaultSelect={["IpRange"]} appName="IP 管理">
    <IpSearch {...IpSearchProps}/>
    <IpList {...ipListProps}></IpList>
    <IpListModalGen />
    </MainLayout>

  )
}

function mapStateToProps({ ipRange }) {
  return { ipRange };
}


export default connect(mapStateToProps)(IpRangeRouter);
