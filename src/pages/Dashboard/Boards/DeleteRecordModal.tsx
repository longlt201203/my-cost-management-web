import { Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export interface DeleteRecordModalProps {
  isOpen?: boolean;
  isLoading?: boolean;
  recordId: number;
  onCancel?: () => void;
  onConfirmDelete?: (recordId: number) => void;
}

export default function DeleteRecordModal({
  recordId,
  isLoading,
  isOpen,
  onCancel,
  onConfirmDelete,
}: DeleteRecordModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("delete")}
      closable={false}
      maskClosable={!isLoading}
      okText={t("delete")}
      cancelText={t("cancel")}
      okButtonProps={{ variant: "solid", color: "danger", loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      onCancel={onCancel}
      onOk={() => onConfirmDelete && onConfirmDelete(recordId)}
      open={isOpen}
    >
      <Text>{t("deleteRecordMessage")}</Text>
    </Modal>
  );
}
