import request from '../../utils/request';
import {query,del,add,queryRegion} from '../../services/ipRangeService.js'
import {queryIsp} from '../../services/ispService.js'

export default {

  namespace: 'ipRange',

  state: {
    list: [],
    loading: false,
    total: 0,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isp:[],
    regions:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/ipRange') {
          //刷新表格
          dispatch({
            type: 'query',
            payload: {},
          });

          //查询ips静态数据
          dispatch({
            type: 'queryIsps',
            payload: {},
          });

          //查询区域
          dispatch({
            type: 'queryRegions',
            payload: {},
          });
        }
      });
    },
  },


  effects:{
    *query({ payload }, { select, call, put }) {
       yield put({ type: 'showLoading' });
       //清空数据
       yield put({type: 'clearList'});
      const {data} = yield call(query,payload);
       if (data) {
         yield put({
           type: 'querySuccess',
           payload: data
         });
       }else{
          yield put({ type: 'hideLoadind' });
       }
     },
     *queryRegions({ payload }, { select, call, put }){
      const data =  yield call(queryRegion);
      yield  put({
        type:'queryregionSuccess',
        payload:data
      });
    },
     *queryIsps({ payload }, { select, call, put }){
       const data = yield call(queryIsp);
       yield put({
         type: 'queryIspSuccess',
         payload: data.data
        });
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
       yield call(add,payload);
       //刷新表格
       yield put({type:'query'});
     },
  },

reducers:{
  querySuccess(state,action){
       return {...state, list:action.payload.data, loading: false,total:action.payload.count};
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
  queryIspSuccess(state,action){
     return {...state,isp:action.payload.data};
  },
  queryregionSuccess(state,action){
     return {...state,regions:action.payload.data};
  },
  //显示新增对话框
  showModal(state,action){
    return {...state,modalVisible:true};
  },
  //隐藏新增对话框
  hideModal(state) {
    //清空currentItem
    return { ...state,currentItem:{},modalVisible: false };
  },
  //隐藏加载动画效果
  hideLoadind(state){
    return {...state,loading:false}
  },
  //显示加载效果
  showLoading(state) {
    return { ...state, loading: true };
  },
  //清空列表
  clearList(state){
      return {...state,list:[]}
  },
  //设置当前的页数
  setCurrentPage(state,action){
    return {...state,current:action.payload.page}
  }
}

};
