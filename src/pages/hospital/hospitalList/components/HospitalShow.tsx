import React, { useEffect, useState } from 'react'
import { Descriptions, Card, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { reqHospitalMessage } from '@/api/hospital/hospitalList'
import { IHospitalShow } from '@/api/hospital/model/hospitalListModule'


export default function HospitalShow() {
  // 获取路由参数
  const { id } = useParams()
  const navigate = useNavigate()
  // 定义状态
  const [hospitalShow, setHospitalShow] = useState<IHospitalShow>({
    "bookingRule": {
      "cycle": 10,
      "releaseTime": "09:00",
      "stopTime": "12:30",
      "quitDay": -1,
      "quitTime": "15:30",
      "rule": [
        "西院区预约号取号地点：西院区门诊楼一层大厅挂号窗口取号"
      ]
    },
    "hospital": {
      "id": "622574e536a9ba1be763dadd",
      "createTime": "2022-03-07 10:58:45",
      "updateTime": "2023-02-26 12:17:36",
      "isDeleted": 0,
      "param": {
        "hostypeString": "二级乙等",
        "fullAddress": "北京市市辖区丰台区"
      },
      "hoscode": "1000_5",
      "hosname": "中国医学科学院肿瘤医院",
      "hostype": "4",
      "provinceCode": "110000",
      "cityCode": "110100",
      "districtCode": "110106",
      "address": "",
      "logoData": '',
      "intro": "",
      "route": "",
      "status": 1,
    }
  })

  useEffect(() => {
    async function getDetailMessage() {
      const data = await reqHospitalMessage(id as string)
      setHospitalShow(data)
    }
    getDetailMessage()
  }, [])

  return (
    <Card>
      <Descriptions title={'基本信息'} bordered column={2}>
        <Descriptions.Item label="医院名称">{hospitalShow.hospital.hosname}</Descriptions.Item>
        <Descriptions.Item label="医院logo">
          <img style={{ width: '80px' }} src={`data:image/png;base64,` + hospitalShow.hospital.logoData} alt="" />
        </Descriptions.Item>
        <Descriptions.Item label="医院编码">{hospitalShow.hospital.hoscode}</Descriptions.Item>
        <Descriptions.Item label="医院地址">{hospitalShow.hospital.param.fullAddress}</Descriptions.Item>
        <Descriptions.Item label="坐车路线" span={2}>
          {
            hospitalShow.hospital.route
          }
        </Descriptions.Item>
        <Descriptions.Item label="医院简介" span={2}>{
          hospitalShow.hospital.intro
        }
        </Descriptions.Item>
      </Descriptions>

      <Descriptions title={'预约规则信息'} style={{ marginTop: '20px', marginBottom: '20px' }} bordered column={2}>
        <Descriptions.Item label={'预约周期'}>
          {hospitalShow.bookingRule.cycle}天
        </Descriptions.Item>
        <Descriptions.Item label={'放号时间'}>
          {
            hospitalShow.bookingRule.releaseTime
          }
        </Descriptions.Item>
        <Descriptions.Item label={'预约时间'}>
          {
            hospitalShow.bookingRule.quitTime
          }
        </Descriptions.Item>
        <Descriptions.Item label={'退号时间'}>
          {
            hospitalShow.bookingRule.stopTime
          }
        </Descriptions.Item>
        <Descriptions.Item label={'预约规则'}>
          {
            hospitalShow.bookingRule.rule.map((item, index) => {
              return <p key={index}>{`${index + 1}.${item}`}</p>
            })
          }
        </Descriptions.Item>
      </Descriptions>

      <Button type='primary' onClick={() => {
        navigate(-1)
      }}>返回</Button>
    </Card>
  )
}
