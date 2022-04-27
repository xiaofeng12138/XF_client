import VueAMap from 'vue-amap';
import Vue from 'vue'

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '60f854a8bee4cff7906eed51ee13265e',
  //plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  plugin:['AMap.Geocoder','AMap.Marker'],
  v: '1.4.4',
  uiVersion:'1.0.11'
});