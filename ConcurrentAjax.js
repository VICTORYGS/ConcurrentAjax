class ConcurrentAjax {
    constructor(globalAjaxConf={}) {
        this.globalAjaxConf=globalAjaxConf
    }
    ConAjax(pArr,count=1){
        for(;count;count--){
            let p=pArr.shift()
            if(p){
                let ajaxConf=p.ajaxConf||this.globalAjaxConf;
                let method=ajaxConf.ajaxConf||'get',
                    headers=ajaxConf.headers|| {},
                    body=ajaxConf.body|| {},
                    params=ajaxConf.params|| {},
                    // 在已经引入axios的情况下 优先使用axios
                    axiosHanle=ajaxConf.axiosHanle||this.$axios||this.axios;
                if(axiosHanle){
                    axiosHanle({
                        method,
                        url: p.url,
                        data: body,
                        headers,
                        params
                    }).then(p.then).catch(p.catch).finally(()=>this.ConAjax(pArr))
                }else {// 非axios 默认fetch
                    let query=(new URLSearchParams(params)).toString()
                    fetch(p.url+(query?'&'+query:''),{
                        method,
                        body:/post/i.test(method)?body:null,
                        headers
                    })
                        .then(d=>{
                            if(/^[4|5]\d\d$/.test(String(d.status))){
                                // 触发catch
                                p.catch(d)
                            }else {
                                p.then(d)
                            }
                        })
                        .finally((d)=>{
                            console.log(d);
                            this.ConAjax(pArr)
                        })
                }

            }
        }
    }
}


export default ConcurrentAjax;