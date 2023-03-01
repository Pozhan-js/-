import React, { useState, useEffect, Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Card, Space, Table, Tooltip, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { HospitalSetDataList, HospitalSetData } from '@/api/hospital/model/hospitalSetModule'
import { reqGetHospitalList, deleteHospitalSet, deleteAllHospitalSet } from '@/api/hospital/hospitalSet'

export default function HospitalSet() {

  const [hospitalSetLs, setHospitalSetLs] = useState<HospitalSetDataList>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(5)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const [IdList, setIdList] = useState<Key[]>([])

  // 获取表单实例
  const [form] = Form.useForm()

  // 获取编程式导航函数
  const navigate = useNavigate()

  // 组件挂载
  useEffect(() => {
    // 组件挂载时调用函数 获取数据
    getHospitalsSetList(page, pageSize)
  }, [])

  async function getHospitalsSetList(page: number, limit: number) {
    setLoading(true)
    const { hoscode, hosname } = form?.getFieldsValue()

    const hospitalData = await reqGetHospitalList({ page, limit, hosname, hoscode })
    setPage(page)
    setPageSize(limit)
    setHospitalSetLs(hospitalData.records)
    setTotal(hospitalData.total)
    setLoading(false)
  }

  // 点击查询按钮
  const onFinish = (values: any) => {
    getHospitalsSetList(page, pageSize)
  };

  // 清空按钮
  const setFrom = () => {
    // 重置表单内容
    form.resetFields()
    // 重新发送请求
    getHospitalsSetList(1, 5)
  }

  // 跳转到添加医院表单
  const goAddHospital = () => {
    navigate('/syt/hospital/hospitalSet/add')
  }

  // 删除一条数据
  const delHospitalSet = (id: number) => async () => {
    await deleteHospitalSet(id)
    // 组件挂载时调用函数 获取数据
    getHospitalsSetList(page, pageSize)
    message.success('删除成功')
  }

  // 批量删除数据
  const batchDelHospitalSet = async () => {
    await deleteAllHospitalSet(IdList)

    // 组件挂载时调用函数 获取数据
    getHospitalsSetList(page, pageSize)
    setIdList([])
    message.success('批量删除成功')
  }

  // 设置删除数据
  const setBatchDelButton = (selectedRowKeys: Key[]) => {
    // 获取到请求参数
    setIdList(selectedRowKeys)
  }

  const columns: ColumnsType<HospitalSetData> = [
    {
      title: '序号',
      width: 70,
      align: 'center',
      render(value, record, index) {
        return index + 1
      },
    },
    {
      title: '医院名称',
      align: 'center',
      dataIndex: 'hosname',
    },
    {
      title: '医院编号',
      align: 'center',
      dataIndex: 'hoscode',
    },
    {
      title: 'api基础路径',
      align: 'center',
      dataIndex: 'apiUrl',
    },
    {
      title: '签名',
      align: 'center',
      dataIndex: 'signKey',
    },
    {
      title: '联系人名称',
      align: 'center',
      dataIndex: 'contactsName',
    },
    {
      title: '联系人手机',
      align: 'center',
      dataIndex: 'contactsPhone',
    },
    {
      title: '操作',
      align: 'center',
      width: 120,
      fixed: 'right',
      render: (_, record) => {
        return <Space size={'middle'}>
          <Tooltip title={'编辑'}>
            <Button type='primary' onClick={() => {
              navigate('/syt/hospital/hospitalSet/edit/' + record.id)
            }} icon={< EditOutlined />}></Button >
          </Tooltip>
          <Tooltip title={'删除'}>
            <Button type='primary' onClick={delHospitalSet(record.id)} danger icon={<DeleteOutlined />}></Button >
          </Tooltip>
        </Space >
      }
    }
  ];

  return (
    <Card>
      <Space direction='vertical' size={'large'}>
        <Form
          name="basic"
          onFinish={onFinish}
          form={form}
          layout='inline'
        >
          <Form.Item
            name="hosname"
          >
            <Input placeholder='医院名称' />
          </Form.Item>

          <Form.Item
            name="hoscode"
          >
            <Input placeholder='医院编号' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit" icon={<SearchOutlined></SearchOutlined>}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={setFrom}>清空</Button>
          </Form.Item>
        </Form>
        {/* 按钮  style={{marginTop: '20px'}}*/}
        <Space >
          <Button type='primary' onClick={goAddHospital}>添加</Button>
          <Button type='primary' onClick={batchDelHospitalSet} disabled={!IdList.length} danger>批量删除</Button>
        </Space>
      </Space>
      {/* 表格数据 */}
      <Table
        loading={loading}
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={hospitalSetLs}
        rowKey='id'
        scroll={{ x: 1500 }}
        bordered
        rowSelection={{
          onChange: setBatchDelButton
        }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          showTotal: (total) => {
            return `总共${total}条`
          },
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '10'],
          showQuickJumper: true,
          onChange: getHospitalsSetList
        }}
      />
    </Card>
  )
}
