import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MainLayout from '../components/MainLayout';
import IpList from '../components/IpRange/IpList';
const IpRangeRouter = ()=>{
  return(
    <MainLayout>
    <IpList></IpList>
    </MainLayout>

  )
}

export default IpRangeRouter;
