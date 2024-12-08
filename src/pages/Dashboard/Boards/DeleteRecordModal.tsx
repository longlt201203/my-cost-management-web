import { Modal, Typography } from "antd";
import { RecordResponse } from "../../../apis/record.service";

const { Text } = Typography;

export interface DeleteRecordModalProps {
  isOpen?: boolean;
  isLoading?: boolean;
  record: RecordResponse;
  onCancel?: () => void;
  onConfirmDelete?: (recordId: number) => void;
}

export default function DeleteRecordModal({
  record,
  isLoading,
  isOpen,
  onCancel,
  onConfirmDelete,
}: DeleteRecordModalProps) {
  return (
    <Modal
      title="Delete"
      closable={false}
      maskClosable={!isLoading}
      okText="Delete"
      okButtonProps={{ variant: "solid", color: "danger", loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      onCancel={onCancel}
      onOk={() => onConfirmDelete && onConfirmDelete(record.id)}
      open={isOpen}
    >
      <Text>Are you sure you want to delete this record?</Text>
    </Modal>
  );
}
