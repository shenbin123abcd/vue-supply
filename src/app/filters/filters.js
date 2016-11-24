export function date_stepHandler(value) {
    if(value==0){
        return '中午'
    }else if(value==1){
        return '晚上'
    }else{
        return ''
    }
}