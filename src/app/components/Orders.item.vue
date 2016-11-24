<template>
    <router-link :to="{ name: 'order', params: { id:  item.id }}" class="item">

        <div class="title">
            <div class="subject">{{ item.body }}</div>
            <div class="status">
                {{ item.status_title }}

            </div>
        </div>
        <div class="content">
            <div class="time">
                <svg class="haloIcon" aria-hidden="true">
                    <use xlink:href="#haloIcon-time"></use>
                </svg>
                {{item.start_date}}
                ({{item.date_step|date_stepHandler}})
            </div>
            <div class="loaction">
                <svg class="haloIcon" aria-hidden="true">
                    <use xlink:href="#haloIcon-hotel"></use>
                </svg>
                {{item.hotel_name}}
                ({{item.hall_name}})
            </div>
            <div  v-if="item.status!=2" class=line></div>

            <div class=bts>
                <mt-button v-if="item.status==0&&item.pay_status==1"
                           @click.prevent.native="setConfirm(item,1)"
                           type="primary" size="small" >订单确认</mt-button>
                <mt-button v-if="item.status==1&&item.pay_status==1"
                           @click.prevent.native="setComplete(item,2)"
                           type="primary" size="small" >搭建完成</mt-button>
            </div>

        </div>

    </router-link>
</template>

<script type="text/babel">
    import {date_stepHandler} from '../filters/filters'
    import {setStatus} from '../services/services'
    import { MessageBox, Indicator } from 'mint-ui';
    export default{
        props: ['item'],
        data(){
            return{
                msg:'hello vue'
            }
        },
        filters: {
            date_stepHandler: date_stepHandler
        },
        methods: {
            setConfirm(data,type){
                Indicator.open();
                setStatus({
                    order_id:data.id,
                    type,
                }).then(res=>{
                    Indicator.close();
                    hb.lib.weui.toast(res.data.info);

                    this.$emit('confirm', data.id)
                    //console.log(res)
                },res=>{
                    Indicator.close();
                    MessageBox.alert(res);
                })
            },
            setComplete(data,type){
                MessageBox.confirm('您确认完成吗').then(action => {
                    Indicator.open();
                    setStatus({
                        order_id:data.id,
                        type,
                    }).then(res=>{
                        Indicator.close();
                        hb.lib.weui.toast(res.data.info);

                        this.$emit('complete', data.id)
                        //console.log(res)
                    },res=>{
                        Indicator.close();
                        MessageBox.alert(res);
                    })
                },res=>{

                });
            },
        }

    }
</script>

<style scoped lang="scss" >
    @import "../../css/hbVariables";
    @import "../../css/hbReset";
    @import "../../css/hbAnimated";
    .item{
        border: 1px solid #d7d7d7;
        margin-top: 15px;
        display: block;
        color: inherit;

    }
    .status{
        color: $mainColor;
    }
    
    .title{
        border-bottom: 1px solid #d7d7d7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
    }
    .line{
        height: 1px;
        background-color: #d7d7d7;
        margin: 10px 0;
    }
    .content{
        padding: 10px 15px;
    }

    .loaction{
        margin-top: 5px;
    }
    .bts{
        margin-top: 2px;
        text-align: right;

    }

</style>
