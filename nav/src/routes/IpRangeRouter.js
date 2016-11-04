import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import IpList from '../components/IpRange/IpList';
import IpListModal from '../components/IpRange/IpListModal';
import IpSearch from '../components/IpRange/IpSearch';
const IpRangeRouter = ({ipRange,dispatch})=>{

  const {list,loading,total,current,modalVisible,currentItem} = ipRange;

  const ipListProps = {
    dataSource: list,
    loading:loading,
    total:total,
    current:current,
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
    onOk:function(data){
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
  return(
    <MainLayout>
    <IpSearch />
    <IpList {...ipListProps}></IpList>
    <IpListModalGen />
    </MainLayout>

  )
}

function mapStateToProps({ ipRange }) {
  return { ipRange };
}


export default connect(mapStateToProps)(IpRangeRouter);
