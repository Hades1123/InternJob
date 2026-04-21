import { updateSummaryAPI } from '@/api/company.api';
import { ALL_TECH_STACKS } from '@/constants/techStacks';
import { useCompanyQueryId } from '@/hooks/query/companyQuery';
import { useMutation } from '@tanstack/react-query';
import { App, Form, Input, Modal, Select } from 'antd';
import { useEffect, useMemo } from 'react';

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
  const { message } = App.useApp();

  const techStackOptions = useMemo(() => {
    const fromDb = data?.allTechStacks ?? [];
    const merged = [...new Set([...ALL_TECH_STACKS, ...fromDb])];
    return merged.map((item) => ({
      label: item,
      value: item,
    }));
  }, [data?.allTechStacks]);

  const updateMutation = useMutation({
    mutationFn: updateSummaryAPI,
    onSuccess: (_data, _variables, _, context) => {
      message.success('Cập nhật thành công');
      setOpen(false);
      context.client.invalidateQueries({ queryKey: ['company'] });
    },
    onError: (error) => {
      message.error(error.message || 'Cập nhật thất bại');
    },
  });

  const handleSubmitForm = () => {
    form.submit();
  };

  const onFinish = (value: {
    allTechStacks: string[];
    generalNotes: string;
  }) => {
    const normalizedTechStacks = [
      ...new Set(
        (value.allTechStacks ?? [])
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean)
      ),
    ];
    updateMutation.mutate({
      id: companyId,
      allTechStacks: normalizedTechStacks,
      generalNotes: value.generalNotes.trim(),
    });
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
      confirmLoading={updateMutation.isPending}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Form name="basic" form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item<FieldType> label="TechStacks" name="allTechStacks">
            <Select
              mode="tags"
              options={techStackOptions}
              showSearch
              tokenSeparators={[',']}
            />
          </Form.Item>

          <Form.Item<FieldType> label="Hạn nộp" name="generalNotes">
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
