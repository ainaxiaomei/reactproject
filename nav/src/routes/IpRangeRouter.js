import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import IpList from '../components/IpRange/IpList';
import IpListModal from '../components/IpRange/IpListModal';
const IpRangeRouter = ({ipRange,dispatch})=>{

  const {list,loading,total,current} = ipRange;

  const ipListProps = {
    dataSource: list,
    loading:loading,
    total:total,
    current:current,
  };

  return(
    <MainLayout>
    <IpList {...ipListProps}></IpList>
    <IpListModal/>
    </MainLayout>

  )
}

function mapStateToProps({ ipRange }) {
  console.log({ ipRange });
  return { ipRange };
}


export default connect(mapStateToProps)(IpRangeRouter);
