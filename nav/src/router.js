import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Users from './routes/Users';
import IpRangeRouter from './routes/IpRangeRouter';
import LocationRecord from './routes/LocationRecordRouter.js';
export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IpRangeRouter} />
      <Route path="/users" component={Users} />
      <Route path="/ipRange" component={IpRangeRouter} />
      <Route path="/location" component={LocationRecord} />
    </Router>
  );
};
