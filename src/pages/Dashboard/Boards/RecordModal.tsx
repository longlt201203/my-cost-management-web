import { Button, Form, Input, Modal } from "antd";
import { RecordResponse } from "../../../apis/record.service";
import { useEffect } from "react";

export interface RecordModalProps {
  record: RecordResponse;
  isOpen?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (values: RecordResponse) => void;
}

export default function RecordModal({
  record,
  isOpen,
  isLoading,
  onCancel,
  onSubmit,
}: RecordModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record]);

  return (
    <Modal
      title={record.id ? "Update Record" : "Create Record"}
      closable={false}
      maskClosable={!isLoading}
      open={isOpen}
      onCancel={onCancel}
      cancelButtonProps={{ disabled: isLoading }}
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            loading={isLoading}
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Save
          </Button>
        </>
      )}
    >
      <Form<RecordResponse>
        form={form}
        disabled={isLoading}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item<RecordResponse> hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item<RecordResponse> name="content">
          <Input placeholder="Enter content..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}
