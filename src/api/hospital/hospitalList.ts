import { request } from "@/utils/http";
import { HospitalListResponse, IHospitalItemParams, ProvinceList, CityListType, IHospitalShow } from './model/hospitalListModule'

export const reqGetHospitalList = ({ page, pageSize, provinceCode, cityCode, districtCode, hosname, hoscode, hostype, status }: IHospitalItemParams) => {
  return request.get<any, HospitalListResponse>(`/admin/hosp/hospital/${page}/${pageSize}`, {
    params: {
      provinceCode,
      cityCode,
      districtCode,
      hosname,
      hoscode,
      hostype,
      status
    }
  })
}

// 获取省的数据
export const reqProvince = (dictCode = 'province') => {
  return request.get<any, ProvinceList>(`/admin/cmn/dict/findByDictCode/${dictCode}`)
}

// 获取市区的数据
export const reqCityOrDistrict = (parentId: number) => {
  return request.get<any, CityListType>(`/admin/cmn/dict/findByParentId/${parentId}`)
}

// 获取医院详情
export const reqHospitalMessage = (hospitalId: string) => {
  return request.get<any, IHospitalShow>(`/admin/hosp/hospital/show/${hospitalId}`)
}