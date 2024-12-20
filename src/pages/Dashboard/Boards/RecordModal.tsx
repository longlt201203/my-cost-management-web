import { Button, Form, Input, Modal } from "antd";
import { RecordResponse } from "../../../apis/record.service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record]);

  return (
    <Modal
      title={record.id ? t("updateRecord") : t("addRecord")}
      closable={false}
      maskClosable={!isLoading}
      open={isOpen}
      onCancel={onCancel}
      cancelText={t("cancel")}
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
            {t("save")}
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
        <Form.Item<RecordResponse>
          name="content"
          rules={[{ required: true, message: t("contentRequired") }]}
        >
          <Input placeholder={t("enterContent")} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
