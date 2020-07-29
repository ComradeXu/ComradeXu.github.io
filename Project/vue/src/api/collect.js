import request from '@/utils/request'

export function getquanzhong(page, page_num,parentid) {
    return request({
      url: 'caiji/getlanm',
      method: 'get',
      params: {
        page,
        page_num,
        parentid
      }
    })
  }

  export function addlanmu(ruleForm,parentid) {
    var formData = new FormData()
    formData.append('name', ruleForm.title)
    formData.append('parentid',parentid)
    return request({
      url: 'caiji/addlanmu',
      method: 'POST',
      data: formData
    })
  }

  export function addconf(ruleForm,parentid) {
    var formData = new FormData()
    formData.append('name', ruleForm.name)
    formData.append('orders',ruleForm.orders)
    formData.append('parentid',ruleForm.parentid)
    formData.append('pagenum',ruleForm.pagenum)
    formData.append('url',ruleForm.url)
    formData.append('tagname',ruleForm.tagname)
    formData.append('classname',ruleForm.classname)
    formData.append('ejclassname',ruleForm.ejclasssname)
    formData.append('tagcontent',ruleForm.tagcontent)
    formData.append('contentclassname',ruleForm.content)
    return request({
      url: 'caiji/addconf',
      method: 'POST',
      data: formData
    })
  }


  export function xinwen(parentid) {
    return request({
      url: 'caiji/xinwen',
      method: 'POST',
      data: parentid
    })
  }