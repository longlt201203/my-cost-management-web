import { useQuery } from "@tanstack/react-query";
import { Flex, message, Segmented, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import BoardService, { BoardResponse } from "../../../apis/board.service";
import handleError from "../../../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";
import Daily from "./Daily";
import { useState } from "react";

const { Title } = Typography;

export default function DashboardAnalyticsPage() {
  const { boardId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { showBoundary } = useErrorBoundary();

  const listBoardsInfo = useQuery<BoardResponse[]>({
    queryKey: ["listBoards"],
    queryFn: BoardService.listBoards,
    initialData: [],
  });
  const boards = listBoardsInfo.data;
  if (listBoardsInfo.error) {
    handleError(listBoardsInfo.error, showBoundary, messageApi, t);
  }

  const getBoardInfo = useQuery<BoardResponse | undefined>({
    queryKey: ["getBoard", boardId],
    queryFn: () =>
      boardId ? BoardService.getBoard(Number(boardId)) : undefined,
    enabled: !!boardId,
  });
  const board = getBoardInfo.data;
  if (getBoardInfo.error) {
    handleError(getBoardInfo.error, showBoundary, messageApi, t);
  }

  const [currentSegment, setCurrentSegment] = useState("Daily");

  const contentMap: any = {
    Daily: board ? <Daily board={board} /> : <></>,
    Monthly: <></>,
    Yearly: <></>,
  };

  return (
    <>
      {contextHolder}
      <Flex className="p-4" gap="middle" vertical>
        <Title level={2} className="mb-0">
          {t("analytics")}
        </Title>
        <Flex gap="small">
          <Select
            options={boards.map((board) => ({
              label: board.title,
              value: board.id,
            }))}
            placeholder={t("selectBoard")}
            onChange={(v) => {
              navigate(`/analytics/v2/${v}`);
            }}
            value={board?.id}
          />
          {board && (
            <Segmented
              value={currentSegment}
              onChange={(v) => setCurrentSegment(v)}
              options={Object.keys(contentMap)}
            />
          )}
        </Flex>
        {contentMap[currentSegment]}
      </Flex>
    </>
  );
}
