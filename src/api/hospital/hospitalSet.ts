// 发送请求获取医院设置列表信息
import { request } from "@/utils/http";
import { Key } from 'react'
import type { HospitalSetParams, responseHospitalSet, AddHospitalSetData, HospitalSetData } from './model/hospitalSetModule'

//1. 获去医院设置列表数据
export const reqGetHospitalList = ({ page, limit, hosname, hoscode }: HospitalSetParams) => {
  return request.get<any, responseHospitalSet>(`/admin/hosp/hospitalSet/${page}/${limit}`,
    {
      params: {
        hosname,
        hoscode
      }
    })
}

// 2.添加医院配置
export const reqAddHospitalSet = (data: AddHospitalSetData) => {
  return request.post<any, any>('/admin/hosp/hospitalSet/save', data)
}

// 3.获取医院配置按钮
export const reqEditHospitalSet = (id: string | undefined) => {
  return request.get<any, HospitalSetData>(`/admin/hosp/hospitalSet/get/${id}`)
}

// 4.编辑表单信息
export const reqEditFormHospitalSet = (data: AddHospitalSetData) => {
  return request.put<any, null>('/admin/hosp/hospitalSet/update', data)
}

// 5.删除一条医院设置
export const deleteHospitalSet = (id: number) => {
  return request.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`)
}

// 批量删除数据
export const deleteAllHospitalSet = (idList: Key[]) => {
  return request.delete<any, null>(`/admin/hosp/hospitalSet/batchRemove`, {
    data: idList
  })
}