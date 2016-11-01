import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Users from './routes/Users';
import IpRangeRouter from './routes/IpRangeRouter';
export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IpRangeRouter} />
      <Route path="/users" component={Users} />
    </Router>
  );
};
