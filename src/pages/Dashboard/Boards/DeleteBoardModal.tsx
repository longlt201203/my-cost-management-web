import { Modal, Typography } from "antd";
import { BoardResponse } from "../../../apis/board.service";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Modal
      title={t("deleteBoard")}
      okText={t("delete")}
      okButtonProps={{
        variant: "solid",
        color: "danger",
        loading: isLoading,
      }}
      onOk={() => onConfirmDelete && onConfirmDelete(board.id)}
      cancelButtonProps={{ disabled: isLoading }}
      cancelText={t("cancel")}
      closable={false}
      maskClosable={!isLoading}
      open={isOpen}
      onCancel={onCancel}
    >
      <Text>
        <Trans
          i18nKey="deleteBoardMessage"
          values={{ title: board.title }}
          components={{ 1: <Text strong /> }}
        >
          Are you sure you want to delete board{" "}
          <Text strong>{board.title}</Text>?
        </Trans>
      </Text>
    </Modal>
  );
}
