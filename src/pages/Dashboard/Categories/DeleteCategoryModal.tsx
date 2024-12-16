import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export interface DeleteCategoryModalProps {
  open?: boolean;
  loading?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
}

export default function DeleteCategoryModal({
  open,
  loading,
  onCancel,
  onOk,
}: DeleteCategoryModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("delete")}
      open={open}
      closable={false}
      maskClosable={!loading}
      okText={t("delete")}
      okButtonProps={{ variant: "solid", color: "danger", loading: loading }}
      cancelText={t("cancel")}
      cancelButtonProps={{ disabled: loading }}
      onCancel={onCancel}
      onOk={onOk}
    >
      {t("deleteCategoriesMessage")}
    </Modal>
  );
}
