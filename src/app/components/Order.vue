<template>
    <div class="wrapper">
        <span @click="back" class="page-back"><i class="mintui mintui-back"></i></span>
        <div class="page-title">订单详情</div>
        <div class="detail">
            <div class="title">
                <div class="subject">{{ data.body }}</div>
                <div class="status">
                    {{ data.status_title }}
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item text-left">
                    <label class="weui-form-preview__label">订单号</label>
                    <span class="weui-form-preview__value">{{data.order_no}}</span>
                </div>
                <div class="weui-form-preview__item text-left">
                    <label class="weui-form-preview__label">服务时间</label>
                    <span class="weui-form-preview__value">{{data.start_date}}</span>
                </div>
                <div class="weui-form-preview__item text-left">
                    <label class="weui-form-preview__label">酒店名称</label>
                    <span class="weui-form-preview__value">{{data.hotel_name}}</span>
                </div>
                <div class="weui-form-preview__item text-left">
                    <label class="weui-form-preview__label">酒店地址</label>
                    <span class="weui-form-preview__value">{{data.address}}</span>
                </div>
                <div class="weui-form-preview__item text-left">
                    <label class="weui-form-preview__label">联系电话</label>
                    <span class="weui-form-preview__value">{{data.contact}}</span>
                </div>
            </div>
            <div class="line"></div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">道具规格</label>
                    <span class="weui-form-preview__value">{{data.spec}}</span>
                </div>
                <div class="weui-form-preview__item">
                    <label class="weui-form-preview__label">服务价格</label>
                    <span class="weui-form-preview__value">{{data.real_amount}}</span>
                </div>
            </div>
        </div>
        <div class=bts>
            <mt-button @click.native="back" size="small">返回</mt-button>
            <mt-button v-if="data.status==0&&data.pay_status==1"
                       @click.prevent.native="setConfirm(data,1)"
                       type="primary" size="small" >订单确认</mt-button>
            <mt-button v-if="data.status==1&&data.pay_status==1"
                       @click.prevent.native="setComplete(data,2)"
                       type="primary" size="small" >搭建完成</mt-button>
        </div>
    </div>
</template>


<script type="text/babel">
    import {date_stepHandler} from '../filters/filters'
    import {setStatus} from '../services/services'
    import { MessageBox, Indicator } from 'mint-ui';
    export default{
        props: ['item'],
        data(){
            return{
                data:{}
            }
        },
        filters: {
            date_stepHandler: date_stepHandler
        },
        methods: {
            getData(data) {
                Indicator.open();
                return this.$http.get('/api/smanage/orderDetail?version=3',{
                    params:data,
                    emulateJSON: true,
                    headers: {
                        Authorization:`Bearer ${hb.Cookies.get('c_supply_token')}`
                    },
                }).then((res) => {
                    Indicator.close();
                    if(res.data.iRet==1){
                        this.data=res.data.data.detail;
                    }else{
                        MessageBox.alert(res.data.info);
                    }
                }, (res) => {
                    Indicator.close();
                    MessageBox.alert('网络繁忙请稍后再试');
                });

            },
            back() {
                this.$router.go(-1);
            },
            setConfirm(data,type){
                Indicator.open();
                setStatus({
                    order_id:data.id,
                    type,
                }).then(res=>{
                    Indicator.close();
                    hb.lib.weui.toast(res.data.info);
                    this.$router.go(-1);
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
                        this.$router.go(-1);
                        //console.log(res)
                    },res=>{
                        Indicator.close();
                        MessageBox.alert(res);
                    })
                },res=>{

                });
            },
        },
        mounted(){
            this.getData({order_id: this.$route.params.id});
        }

    }
</script>

<style scoped lang="scss" >
    @import "../../css/hbVariables";
    @import "../../css/hbReset";
    @import "../../css/hbAnimated";
    .page-title {
        font-size: 20px;
        margin: 0px auto;
        padding: 20px;
        text-align: center;
        display: block;
        line-height: 1;
        border-bottom: 1px solid #d7d7d7;
    }
    .page-back {
        display: inline-block;
        top: 12px;
        left: 10px;
        position: absolute;
        width: 40px;
        height: 40px;
        text-align: center;

    }
    .page-back i {
        font-size: 24px;
        line-height: 40px;
    }
    .detail{
        padding: 15px;
        padding-top: 0;
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
    .text-left{
        text-align: left;
    }
    .line{
        background-color: #d7d7d7;
        height: 1px;
    }
    .wrapper{
        padding-bottom: 63px;
    }
    .bts{
        padding: 15px;
        position: fixed;
        bottom: 0;
        text-align: right;
        left: 0;
        width: 100%;
        .mint-button{
            margin-left: 10px;
        }
    }



</style>
