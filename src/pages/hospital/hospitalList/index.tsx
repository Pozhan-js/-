import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Card, Select, Input, Button, Table, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { reqGetHospitalList, reqProvince, reqCityOrDistrict } from '@/api/hospital/hospitalList'
import { HospitalListType, ProvinceList, CityListType } from '@/api/hospital/model/hospitalListModule'

export default function HospitalList() {
  const navigate = useNavigate()

  const [hospitalList, setHospitalList] = useState<HospitalListType>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(50)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)

  // 三级联动下拉框数据
  const [province, setProvince] = useState<ProvinceList>([])
  const [city, setCity] = useState<CityListType>([])
  const [district, setDistrict] = useState<CityListType>([])

  // 省市区状态定义
  const [plaoding, setPloading] = useState<boolean>(false)
  const [cloading, setCloading] = useState<boolean>(false)
  const [dloading, setDloading] = useState<boolean>(false)


  // 获取医院类型
  const [type, setType] = useState<CityListType>([])

  //获取表单信息
  const [form] = Form.useForm()

  useEffect(() => {
    getHospitalListData(page, pageSize)
    getProvinces()
    getHosType()
  }, [])

  async function getHospitalListData(page: number, pageSize: number) {
    try {
      setLoading(true)
      const { provinceCode, cityCode, districtCode, hosname, hoscode, hostype, status } = form.getFieldsValue()
      setPage(page)
      setPageSize(pageSize)
      const listData = await reqGetHospitalList({ page, pageSize, provinceCode, cityCode, districtCode, hosname, hoscode, hostype, status })
      setHospitalList(listData.content)
      setTotal(listData.totalElements)
    } finally {
      setLoading(false)
    }
  }

  // 获取省数据
  async function getProvinces() {
    setPloading(true)
    const reqProvinceData = await reqProvince()
    setProvince(reqProvinceData)
    setPloading(false)
  }

  // 获取市级数据
  async function getCityData(id: number) {
    setCloading(true)
    // 将市区下拉框中的数据清除
    form.setFieldsValue({ cityCode: undefined, districtCode: undefined })
    const cityData = await reqCityOrDistrict(id)
    setCity(cityData)
    setCloading(false)
  }

  // 获取区级数据
  async function getDistrictData(id: number) {
    setDloading(true)
    form.setFieldsValue({ districtCode: undefined })
    const districtData = await reqCityOrDistrict(id)
    setDistrict(districtData)
    setDloading(false)
  }

  // 获取医院类型数据
  async function getHosType(value = 10000) {
    const hosTypeData = await reqCityOrDistrict(value)
    setType(hosTypeData)
  }

  // 查询按钮
  const onFinish = (values: any) => {
    // console.log('Success:', values);
    getHospitalListData(page, pageSize)
  };

  // 清除表单
  const setForm = () => {
    form.resetFields()
    getHospitalListData(page, pageSize)
  }

  const columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => {
        return index + 1
      },
      align: 'center' as 'center',
    },
    {
      title: '医院logo',
      render: (text: any) => {
        return <img width="80" src={`data:image/png;base64,${text.logoData}`} alt="" />
      }
    },
    {
      title: '医院名称',
      dataIndex: 'hosname'
    },
    {
      title: '等级',
      render: (text: any) => {
        return text.param.hostypeString
      }
    },
    {
      title: '详情地址',
      render: (text: any) => {
        return text.param.fullAddress
      }
    },
    {
      title: '医院状态',
      render: (text: any) => {
        return !!text.status ? '上线' : '未上线'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    }, {
      title: '操作',
      render: (text: any) => {
        return (
          <Space>
            <Button type='primary' onClick={() => {
              navigate('/syt/hospital/hospitalList/show/' + `${text.id}`)
            }}>查看</Button>
            <Button type='primary' onClick={() => {
              navigate(`/syt/hospital/hospitalList/schedule/${text.hoscode}`)
            }}>排班</Button>
            <Button type='primary'>上线/下线</Button>
          </Space>
        )
      }
    }
  ]

  return (
    <Card>
      <Space direction='vertical' size={'large'}>
        <Form layout={'inline'} form={form} onFinish={onFinish}>
          <Form.Item name={'provinceCode'}>
            <Select
              loading={plaoding}
              style={{ width: 180 }}
              placeholder='--请选择省--'
              onChange={getCityData}
              options={province?.map((item) => {
                return {
                  value: item.value,
                  label: item.name,
                }
              })}
            />
          </Form.Item>
          <Form.Item name={'cityCode'}>
            <Select
              loading={cloading}
              style={{ width: 180 }}
              placeholder='--请选择市--'
              onChange={getDistrictData}
              options={city?.map((item) => {
                return {
                  value: item.value,
                  label: item.name,
                }
              })}
            />
          </Form.Item>
          <Form.Item name={'districtCode'}>
            <Select
              loading={dloading}
              style={{ width: 180 }}
              placeholder='--请选择区--'
              options={district?.map((item) => {
                return {
                  value: item.value,
                  label: item.name,
                }
              })}
            />
          </Form.Item>
          <Form.Item name={'hosname'} style={{ width: 180 }}>
            <Input placeholder='医院名称'></Input>
          </Form.Item>
          <Form.Item name={'hoscode'} style={{ width: 180 }}>
            <Input placeholder='医院编号'></Input>
          </Form.Item>
          <Form.Item name={'hostype'} style={{ width: 180, marginTop: 20 }}>
            <Select
              placeholder='--医院类型--'
              options={type.map((item) => {
                return {
                  value: item.value,
                  label: item.name,
                }
              })}
            />
          </Form.Item>
          <Form.Item name={'status'} style={{ width: 180, marginTop: 20 }}>
            <Select
              placeholder='--医院状态--'
              options={[
                {
                  value: '1',
                  label: '已上线',
                },
                {
                  value: '0',
                  label: '未上线',
                },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ marginTop: 20 }}>
            <Button type='primary' htmlType="submit" icon={<SearchOutlined />}>查询</Button>
          </Form.Item>
          <Form.Item style={{ marginTop: 20 }}>
            <Button onClick={setForm}>清空</Button>
          </Form.Item>
        </Form>
        <Table
          loading={loading}
          columns={columns}
          style={{ marginTop: 20 }}
          dataSource={hospitalList}
          rowKey="id"
          pagination={{
            total,
            current: page,
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: [2, 5, 10],
            showQuickJumper: true,
            showTotal: () => {
              return `总共${total}条`
            },
            onChange: getHospitalListData
          }}
        ></Table>
      </Space>
    </Card >
  )
}
