

export function setStatus(data={}) {
    return new Promise((resolve, reject) => {
        Vue.http.post('/api/smanage/setStatus?version=3',data,{
            emulateJSON: true,
            headers: {
                Authorization:`Bearer ${hb.Cookies.get('c_supply_token')}`
            },
        }).then((res) => {
            // success callback
            if(res.data.iRet==1){
                resolve(res)
            }else{
                reject(res.data.data.info)
            }
        }, (res) => {
            // error callback
            reject('网络繁忙请稍后再试');
        });
    });

}