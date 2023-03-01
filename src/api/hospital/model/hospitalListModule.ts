
export interface HospitalList {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    hostypeString: string;
    fullAddress: string;
  },
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: string
  route: string
  status: StatusType
}

export interface HospitalItem extends HospitalList {
  bookingRule: IBookingRule,
}

export type HospitalListType = HospitalItem[]

export interface HospitalListResponse {
  content: HospitalListType,
  totalElements: number
}

export type StatusType = 0 | 1

export interface IHospitalItemParams {
  page: number;
  pageSize: number;
  provinceCode: string;
  cityCode: string;
  districtCode: string
  hosname: string
  hoscode: string
  hostype: string
  status: StatusType
}

// 省数据
export interface ProvinceItem {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: object
  parentId: number
  name: string
  value: string
  dictCode: null,
  hasChildren: boolean
}

export type ProvinceList = ProvinceItem[]

// 市级数据
export interface CityItem {
  id: number
  createTime: string
  updateTimeD: string
  isDeleted: number
  param: object
  parentId: number
  name: string
  value: string
  dictCode: string
}

export type CityListType = CityItem[]

//
export interface IBookingRule {
  cycle: number
  releaseTime: string
  stopTime: string
  quitDay: number
  quitTime: string
  rule: [string]
}

// 医院详情
export interface IHospitalShow {
  bookingRule: IBookingRule,
  hospital: HospitalList,
}