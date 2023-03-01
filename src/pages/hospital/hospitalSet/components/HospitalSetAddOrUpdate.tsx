import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, Card, message } from 'antd';
import { reqAddHospitalSet, reqEditHospitalSet, reqEditFormHospitalSet } from '@/api/hospital/hospitalSet'

export default function HospitalSetAddOrUpdate() {
  // 创建编程式导航
  const navigate = useNavigate()
  // 获取From实列上的方法
  const [form] = Form.useForm()
  // 获取路由参数
  const { id } = useParams()

  useEffect(() => {
    async function getEditHospitalSet() {
      const editContent = await reqEditHospitalSet(id as string)
      form.setFieldsValue(editContent)
    }
    // 当获取到id才会获取信息
    id && getEditHospitalSet()
  }, [form, id])

  // 提交按钮执行函数
  const onFinish = async (values: any) => {
    const data = form.getFieldsValue()
    if (id) {
      data.id = id
      await reqEditFormHospitalSet(data)
      message.success('编辑医院成功！')
    } else {
      const result = await reqAddHospitalSet(data)

      if (!result) {
        message.success('添加医院成功！')
      } else {
        message.error(`${result.message}`)
      }
    }
    navigate('/syt/hospital/hospitalSet')
  };

  // 清除表单
  const clearForm = () => {
    // 重置表单
    form.resetFields()
    // 跳转到医院设置页面
    navigate('/syt/hospital/hospitalSet')
  }


  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="医院名称"
          name="hosname"
          rules={[{ required: true, message: '请输入医院名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="医院编号"
          name="hoscode"
          rules={[{ required: true, message: '请输入医院编号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="api基础路径"
          name="apiUrl"
          rules={[{ required: true, message: '请输入api基础路径' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人名称"
          name="contactsName"
          rules={[{ required: true, message: '请输入联系人名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="联系人电话"
          name="contactsPhone"
          rules={[{ required: true, message: '请输入联系人电话', pattern: /^1[3~9]\d{9}$/ }]}
        >
          <Input />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            {id ? '编辑' : '提交'}
          </Button>
          <Button onClick={clearForm} style={{ marginLeft: 20 }}>取消</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

