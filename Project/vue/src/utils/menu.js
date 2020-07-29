import Layout from '@/layout'
// export function menu(value) {
// 	let arr = []
// 	value.forEach((item) => {
// 		let obj = {}
// 		obj.children = []
// 		obj.path = item.path
// 		let str =item.component
// 		obj.component = Layout,
// 		obj.children.push({
// 			name:item.name,
// 			path:item.path,
// 			component:(resolve) => require([`@/views/${str}/index.vue`],resolve),
// 			meta:{
// 				title:'22',
// 				icon:'home'
// 			}
// 		})
// 		arr.push(obj)
// 	})
// 	arr.push({path:'*',redirect:'404',hidden:true})
// 	return arr
// 	// console.log(b)
// 	// value.forEach((item,index) => {
// 	// 	console.log(item)
// 	// 	if(item.component.length == 0){
// 	// 		item.component = () => import('@/layout')
// 	// 	}else{
// 	// 		let str = item.component
// 	// 		item.component = () => import('@/views/content/index')
// 	// 	}
// 	// 	if(item.children && item.children.length !== 0){
// 	// 		return menu(item.children)
// 	// 	}
// 	// })
// }
export function menu(value) {
	let b = value
  	for(let v in b){
  		if(b[v].path.length !== 0 && b[v].meta[0] != 'undefined') {
  			if(b[v].children !== ''){
	  			for(let c in b[v].children){
	  				b[v].children[c].meta={
	  					title:b[v].children[c].meta[0].title,
						icon:b[v].children[c].meta[0].icon
		  			}
		  			b[v].children[c].component = () => import('@/views/content/index')
	  			}
  			}
			b[v].meta={
				title:b[v].meta[0].title,
				icon:b[v].meta[0].icon
			}
			b[v].component = () => import('@/layout')
  		}
	}
	// value.push({path:'*',redirect:'404',hidden:true})
	// console.log(b)
	// value.forEach((item,index) => {
	// 	console.log(item)
	// 	if(item.component.length == 0){
	// 		item.component = () => import('@/layout')
	// 	}else{
	// 		let str = item.component
	// 		item.component = () => import('@/views/content/index')
	// 	}
	// 	if(item.children && item.children.length !== 0){
	// 		return menu(item.children)
	// 	}
	// })
	return value
}
