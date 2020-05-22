import tipComponent from './tip.vue';
import Vue from 'vue';
export default function tip(options = {}) {
  const tipConstruct = Vue.extend(tipComponent);
  let tip;
  if (!tip) {
    tip = new tipConstruct({ propsData: options }).$mount();
  }
  return tip;
}
