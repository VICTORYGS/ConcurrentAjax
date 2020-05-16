# ConcurrentAjax

## Usage

```js
import ConcurrentAjax from './ConcurrentAjax'
let globalAjaxConf={
        // 默认值为 get  
        method:'get',
        headers:{},
        params:{},
        body:{},
        // axiosHanle未设值 默认使用fetch
        axiosHanle:null
}
let ins=new ConcurrentAjax(globalAjaxConf);
let ajaxList=new Array(9).fill({
    url:'/path/example',
    then:d=>console.log('data:',d),
    catch:e=>console.log('err:',e),
    // 不配置ajaxConf 默认使用globalAjaxConf中的配置
    ajaxConf:{
        method:'get',
        headers:{},
        params:{},
        body:{},
        axiosHanle:null
    }
})
// 每次并发进行2个Ajax请求 直到耗尽ajaxList中所有的任务
ins.ConAjax(ajaxList,2)

```
## API

###new ConcurrentAjax([globalAjaxConf])

##### globalAjaxConf

Type: `object`

Ajax config.

### ConAjax(ajaxList,[count=1])

##### ajaxList

Type: `Array`

ajax params List.

##### count

amount of ConcurrentAjax
