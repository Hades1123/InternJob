import { useCompanyQueryId } from '@/hooks/query/companyQuery';
import { Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  companyId: string;
  setCompanyId: (v: string) => void;
}

type FieldType = Pick<ICompany, 'allTechStacks'> & IGeminiSummary;

export const EditModal = (props: IProps) => {
  const { open, setOpen, companyId, setCompanyId } = props;
  const [form] = Form.useForm();
  const { data, isLoading } = useCompanyQueryId(companyId);

  const handleSubmitForm = () => {
    form.submit();
  };

  const onCancel = () => {
    setOpen(false);
    setCompanyId('');
    form.resetFields();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        allTechStacks: data.allTechStacks,
        generalNotes: data.GeminiSumary?.generalNotes,
      });
    }
  }, [data, form]);

  return (
    <Modal
      title="Edit modal"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onOk={handleSubmitForm}
      onCancel={onCancel}
      okText={'Submit'}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={(values) => console.log(values)}
        >
          <Form.Item<FieldType> label="TechStacks" name="allTechStacks">
            <Select mode="tags" />
          </Form.Item>

          <Form.Item<FieldType> label="Hạn nộp" name="generalNotes">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
