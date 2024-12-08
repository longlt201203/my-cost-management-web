import { Modal, Typography } from "antd";
import {
  BoardResponse,
  DailyAnalysisResponse,
} from "../../../apis/board.service";

const { Text } = Typography;

export interface DailyAnalysisModalProps {
  isOpen?: boolean;
  analysis?: DailyAnalysisResponse;
  board?: BoardResponse;
  onOk?: () => void;
}

export default function DailyAnalysisModal({
  isOpen,
  board,
  onOk,
}: DailyAnalysisModalProps) {
  return (
    <Modal
      maskClosable
      closable={false}
      onOk={onOk}
      open={isOpen}
      footer={(_, { OkBtn }) => (
        <>
          <OkBtn />
        </>
      )}
      title={
        <Text>
          Analysis of <Text strong>{board?.title}</Text>
        </Text>
      }
    >
      {}
    </Modal>
  );
}
