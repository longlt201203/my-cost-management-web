import { Form, Input, Modal } from "antd";
import { CategoryResponse } from "../../../apis/categories.service";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export interface CategoryModalProps {
  open?: boolean;
  onCancel?: () => void;
  onSubmit?: (category: CategoryResponse) => void;
  category: CategoryResponse;
  loading?: boolean;
}

export default function CategoryModal({
  open,
  category,
  onCancel,
  onSubmit,
  loading,
}: CategoryModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(category);
  }, [category]);

  return (
    <Modal
      open={open}
      title={category.id ? t("updateCategory") : t("addCategory")}
      closable={false}
      maskClosable={!loading}
      okText={t("save")}
      onOk={form.submit}
      okButtonProps={{ loading: loading }}
      cancelText={t("cancel")}
      onCancel={onCancel}
      cancelButtonProps={{ disabled: loading }}
    >
      <Form<CategoryResponse>
        form={form}
        onFinish={onSubmit}
        disabled={loading}
      >
        <Form.Item<CategoryResponse> hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item<CategoryResponse> name="name">
          <Input placeholder={t("enterCategoryName")} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
