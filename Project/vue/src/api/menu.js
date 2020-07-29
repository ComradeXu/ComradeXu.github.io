import request from '@/utils/request'

export function add(data) {
  	return request({
	    url: 'user/menu_add',
	    method: 'post',
    	data:data
  	})
}

export function del(data) {
  	return request({
	    url: 'user/menu_del',
	    method: 'post',
    	data:data
  	})
}

export function menuList() {
  	return request({
	    url: 'user/menu_list',
	    method: 'get'
  	})
}


