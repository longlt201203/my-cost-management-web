import { Button, DatePicker, Form, Input, Modal } from "antd";
import { RecordResponse } from "../../../apis/record.service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export interface RecordModalFormType extends Omit<RecordResponse, "createdAt"> {
  createdAt: dayjs.Dayjs;
}

export interface RecordModalProps {
  record: RecordModalFormType;
  isOpen?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: (values: RecordModalFormType) => void;
}

export default function RecordModal({
  record,
  isOpen,
  isLoading,
  onCancel,
  onSubmit,
}: RecordModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm<RecordModalFormType>();

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
      <Form<RecordModalFormType>
        form={form}
        disabled={isLoading}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item<RecordModalFormType> hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item<RecordModalFormType>
          label={t("content")}
          name="content"
          rules={[{ required: true, message: t("contentRequired") }]}
        >
          <Input placeholder={t("enterContent")} />
        </Form.Item>
        <Form.Item<RecordModalFormType>
          name="createdAt"
          label={t("time")}
          rules={[{ required: true, message: t("timeRequired") }]}
        >
          <DatePicker
            showTime
            showNow={false}
            placeholder={t("selectTime")}
            format="DD/MM/YYYY HH:mm"
            allowClear={false}
            maxDate={dayjs()}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
