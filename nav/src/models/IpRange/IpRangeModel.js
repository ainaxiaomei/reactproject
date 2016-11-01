function getdata(){
  const mock = {
      total: 3,
      current: 1,
      loading: false,
      list: [
        {
          ipBegin: '127.0.0.1',
          ipEnd: '127.0.0.3',
          continent: 'AS',
          country:'CN',
          province:'SH',
          isp:'DX',
        },
        {
          ipBegin: '127.0.0.1',
          ipEnd: '127.0.0.3',
          continent: 'AS',
          country:'CN',
          province:'SH',
          isp:'DX',
        },
        {
          ipBegin: '127.0.0.1',
          ipEnd: '127.0.0.3',
          continent: 'AS',
          country:'CN',
          province:'SH',
          isp:'DX',
        },
      ],

    };

    return mock;
}

export default {

  namespace: 'ipRange',

  state: {
    list: [],
    loading: false,
    total: null,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/ipRange') {
          dispatch({
            type: 'query',
            payload: location.query,
          });
        }
      });
    },
  },


  effects:{
    *query({ payload }, { select, call, put }) {
       yield put({ type: 'showLoading' });
       const data = yield call(getdata);
       if (data) {
         yield put({
           type: 'querySuccess',
           payload: data
         });
       }
     },
  },

reducers:{
  querySuccess(state,action){
      console.log("query success !");
      return {...state, ...action.payload, loading: false};
  },
  showLoading(state) {
    return { ...state, loading: true };
  },
}

};
