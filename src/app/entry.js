
import App from './App.vue'
import Login from './components/Login.vue'
import Orders from './components/Orders.vue'
import Order from './components/Order.vue'
//import MintUI from 'mint-ui'

import { Field } from 'mint-ui';
Vue.component(Field.name, Field);

import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import { Button } from 'mint-ui';
Vue.component(Button.name, Button);

import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

import  HbFooter from './components/Copy.vue';
Vue.component('hb-footer', HbFooter);





import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

//import 'mint-ui/lib/style.css'


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'login',
            path: '/admin/login',
            component: Login ,
        },
        {
            name: 'order',
            path: '/admin/order/:id',
            component: Order ,
        },
        {
            name: 'index',
            path: '/admin',
            redirect: '/admin/1',
        },
        {
            name: 'orders',
            path: '/admin/:type',
            component: Orders ,
        },
    ]
});

//Vue.use(MintUI);


const myVueApp = new Vue({
    router ,
    el: '#root',
    render: h => h(App)
});
