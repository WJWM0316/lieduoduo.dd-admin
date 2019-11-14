// 节流函数
export  function throttle(fn,Interval){
  return function(){
    let content=this;
    let args=arguments;
    let now =+new Date();
    if(now-last>=Interval){
      last =now;
      fn.apply(context,arguments)
    }
  }
}