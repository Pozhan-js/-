// 获取医院列表参数类型
export interface HospitalSetParams {
  page: number;
  limit: number;
  hosname?: string;
  hoscode?: string;
}

export interface HospitalSetData {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: object;
  hosname: string;
  hoscode: string;
  apiUrl: string;
  signKey: string;
  contactsName: string;
  contactsPhone: string;
  status: number
}

export type HospitalSetDataList = HospitalSetData[]

export interface responseHospitalSet {
  total: number,
  records: HospitalSetDataList
}

// 添加医院配置接口
export interface AddHospitalSetData {
  id: string
  hosname: string;
  hoscode: string;
  apiUrl: string;
  contactsName: string;
  contactsPhone: string;
}
