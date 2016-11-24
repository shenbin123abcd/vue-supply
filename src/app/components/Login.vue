
<template>
    <div>
        <mt-header  title="登录"></mt-header>

        <form class="form"  @submit.prevent="login()">

            <div>
                <mt-field v-model="data.phone"  label="手机" placeholder="请输入手机" type="number"></mt-field>
                <mt-field v-model="data.password" label="密码" placeholder="请输入密码" type="password"></mt-field>
            </div>


            <div class="submit-wrapper">
                <mt-button type="primary" size="large" >登录</mt-button>
            </div>
        </form>
        <hb-footer></hb-footer>

    </div>
</template>


<script type="text/babel">
    import { MessageBox,Indicator  } from 'mint-ui';
    export default {
        name: 'login',
        data (){
            return {
                data: {}
            }
        },
        methods: {
            login() {
                //console.log(this);
                var data=this.data;
                switch (true){
                    case !data.phone:
                        MessageBox.alert('请输入手机号码');
                        break;
                    case !hb.validation.checkPhone(data.phone):
                        MessageBox.alert('手机号码格式不正确！');
                        break;
                    case !data.password:
                        MessageBox.alert('请输入密码');
                        break;
                    default:
                        Indicator.open();
                        this.$http.post('/api/smanage/login?version=3',this.data,{
                            emulateJSON: true,
                        }).then((res) => {
                            // success callback
                            //console.log(res.data)
                            Indicator.close();
                            if(res.data.iRet==1){
                                hb.Cookies.set('c_supply_token',res.data.data.token, { expires: 10 });
                                hb.lib.weui.toast(res.data.info);
                                this.$router.push('/admin/1');
                            }else{
                                MessageBox.alert(res.data.info);
                            }

                        }, (res) => {
                            Indicator.close();
                            // error callback
                            MessageBox.alert('网络繁忙请稍后再试');
                        });
                };

            },
        },

    };

</script>


<style scoped lang="scss" >
    .form {
        margin-top: 20px;
    }
    .submit-wrapper{
        margin-top: 20px;
        padding: 0 10px;
    }
</style>
