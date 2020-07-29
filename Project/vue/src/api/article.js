import request from '@/utils/request'

export function getquanzhong(page, page_num) {
    return request({
      url: 'caiji/getinfo',
      method: 'get',
      params: {
        page,
        page_num,
      }
    })
  }