import request from '../../utils/request';
import {query,del} from '../../services/ipRangeService.js'

export default {

  namespace: 'ipRange',

  state: {
    list: [],
    loading: false,
    total: 8,
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
      const {data} = yield call(query);
       if (data) {
         yield put({
           type: 'querySuccess',
           payload: data
         });
       }else{
          yield put({ type: 'hideLoadind' });
       }
     },
     *delete({ payload }, { select, call, put }){
      yield call(del,payload.record)
      yield put({
        type: 'deleteSuccess',
        payload: payload.record
       });
     },
     *create({ payload }, { call, put }) {
       yield put({ type: 'hideModal' });
       yield put({
         type:'createSuccess',
         payload:payload
       });
     },
  },

reducers:{
  querySuccess(state,action){
      console.log(action);
      return {...state, list:action.payload, loading: false};
  },
  deleteSuccess(state,action){
    const newList = state.list.filter((item)=>{
      return (item.ipBegin != action.payload.ipBegin && item.ipEnd != action.payload.ipEnd)
    })
    return {...state,list:newList}
  },
  createSuccess(state,action){
    const newIpRange = action.payload;
    state.list.push(newIpRange);
    return {...state,list:state.list.slice(0,10),total:state.total+1};
  },
  showLoading(state) {
    return { ...state, loading: true };
  },

  showModal(state,action){
    return {...state,modalVisible:true};
  },

  hideModal(state) {
    //清空currentItem
    console.log("1234");
    return { ...state,currentItem:{},modalVisible: false };
  },
  hideLoadind(state){
    return {...state,loading:false}
  },
}

};
