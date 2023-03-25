//防抖的函数封装
export const myDebounce=function(fn, delay){
	let timer = null
	return function(){
		let content = this;
		let args = arguments;
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			fn.apply(content,args)
		}, delay)
	}
}
