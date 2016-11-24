<template>
    <div class="wrapper">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1" @click.native="search(1)">待确认</mt-tab-item>
            <mt-tab-item id="2" @click.native="search(2)">待搭建</mt-tab-item>
            <mt-tab-item id="3" @click.native="search(3)">已完成</mt-tab-item>
            <mt-tab-item id="0" @click.native="search(0)">全部</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <div class="tab-container"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }" >
            <mt-loadmore :top-method="loadTop"
                         :bottom-method="loadBottom"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false" ref="loadmore">

                <order-item v-for="item in data" :item="item" @confirm="confirm"  @complete="complete" ></order-item>
            </mt-loadmore>
        </div>
    </div>
</template>



<script type="text/babel">
    import { Indicator,MessageBox } from 'mint-ui';
    import OrderItem from './Orders.item.vue'
    export default {
        name: 'orders',
        data (){
            return {
                selected: this.$route.params.type,
                data: [],
                page: 1,
                total: '',
                allLoaded: false,
                wrapperHeight: 0,
            }
        },
        methods: {
            getData(data,isReload=false) {
                Indicator.open();
                var defaultData={
                    type: 1,
                    page:1,
                    per_page:10,
                };

                return this.$http.get('/api/smanage/orderList?version=3',{
                    params:$.extend({},defaultData,data),
                    emulateJSON: true,
                    headers: {
                        Authorization:`Bearer ${hb.Cookies.get('c_supply_token')}`
                    },
                }).then((res) => {
                    Indicator.close();
                    if(res.data.iRet==1){
                        if(isReload){
                            this.data=res.data.data.order;
                            if(this.data.length==res.data.data.total){
                                this.allLoaded = true;// 若数据已全部获取完毕
                            }else{
                                this.allLoaded = false;
                            }
                            this.page=2;
                        }else{
                            this.data=this.data.concat(res.data.data.order);
                            this.page++;
                        }
                        this.total=res.data.data.total;

                        return true

                    }else if(res.data.iRet==-1){
                        setTimeout(()=>{
                            this.$router.push('/admin/login')
                        })
                    }else{
                        MessageBox.alert(res.data.info);
                    }
                }, (res) => {
                    Indicator.close();
                    MessageBox.alert('网络繁忙请稍后再试');
                });

            },
            search(id) {
                //console.log(id);
                //console.log(this.$route.params.type)
                if(this.$route.params.type==id){
                    return
                }else{
                    this.$router.push(`/admin/${id}`)
                }


            },
            loadTop(id) {
                // 加载更多数据
                //console.log(id,this.$refs.loadmore)
                this.getData({type: this.$route.params.type},true).then(res=>{
                    this.$refs.loadmore.onTopLoaded(id)
                });

            },
            loadBottom(id) {
                this.getData({
                    type: this.$route.params.type,
                    page: this.page,
                },false).then(res=>{
                    //console.log(this.page)
                    if(this.data.length==this.total){
                        this.allLoaded = true;// 若数据已全部获取完毕
                    }
                    this.$refs.loadmore.onBottomLoaded(id);
                })
            },
            confirm(id) {
                //console.log(this.data,id)
                var index=_.findIndex(this.data,{id:id})
                this.data.splice(index,1);
            },
            complete(id) {
                //console.log(this.data,id)
                var index=_.findIndex(this.data,{id:id})
                this.data.splice(index,1);
            },
        },
        components:{
            //'other-component':OtherComponent,
            OrderItem,
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                //console.log(to, from)
                this.getData({type: to.params.type},true);
            }
        },
        mounted(){
            //console.log(this.$on);
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-15;
            if(!hb.Cookies.get('c_supply_token')){
                setTimeout(()=>{
                    this.$router.push('/admin/login')
                })
            }else{
                this.getData({type: this.$route.params.type},true);
            }

        }
    };

</script>

<style scoped lang="scss" >
    .tab-container{
        padding: 15px;
    }
    .mint-loadmore{
        margin-bottom: 15px;
    }


</style>

