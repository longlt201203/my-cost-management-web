import { message, Skeleton, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardService, { BoardResponse } from "../../../apis/board.service";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";

const { Text, Title } = Typography;

export default function BoardDetailPage() {
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardResponse>();

  const fetchBoard = async () => {
    try {
      const board = await BoardService.getBoard(Number(boardId));
      setBoard(board);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="p-4">
        {board ? (
          <>
            <Title level={2}>{board?.title}</Title>
          </>
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
}
