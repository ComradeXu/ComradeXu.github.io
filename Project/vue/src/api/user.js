import request from '@/utils/request'

export function login(data) {
  var formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  return request({
    url: 'user/user_login',
    method: 'post',
    data: formData
  })
}

export function getInfo(token) {
  return request({
    url: 'user/user_info',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function addUser(data) {
  return request({
    url: '/user/user_register',
    method: 'post',
    data:data
  })
}

export function userList(page,page_num) {
  return request({
    url: '/user/user_list',
    method: 'get',
    params: { page,page_num }
  })
}

