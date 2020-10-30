import Vue from 'vue';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app')
