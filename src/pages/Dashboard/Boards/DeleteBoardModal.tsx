import { Modal, Typography } from "antd";
import { BoardResponse } from "../../../apis/board.service";

const { Text } = Typography;

export interface DeleteBoardModalProps {
  board: BoardResponse;
  isLoading?: boolean;
  onConfirmDelete?: (boardId: number) => void;
  isOpen?: boolean;
  onCancel?: () => void;
}

export default function DeleteBoardModal({
  isOpen,
  board,
  onConfirmDelete,
  isLoading,
  onCancel,
}: DeleteBoardModalProps) {
  return (
    <Modal
      title="Delete"
      okText="Delete"
      okButtonProps={{
        variant: "solid",
        color: "danger",
        loading: isLoading,
      }}
      onOk={() => onConfirmDelete && onConfirmDelete(board.id)}
      cancelButtonProps={{ disabled: isLoading }}
      closable={false}
      maskClosable={!isLoading}
      open={isOpen}
      onCancel={onCancel}
    >
      <Text>
        Are you sure you want to delete board <Text strong>{board.title}</Text>?
      </Text>
    </Modal>
  );
}
