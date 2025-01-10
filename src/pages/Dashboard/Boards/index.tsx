import { Button, Card, Col, Flex, message, Row, Typography } from "antd";
import { useState } from "react";
import BoardService, { BoardResponse } from "../../../apis/board.service";
import { useNavigate } from "react-router-dom";
import BoardModal from "./BoardModal";
import {
  DeleteOutline,
  EditOutlined,
  LaunchOutlined,
} from "@mui/icons-material";
import handleError from "../../../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";
import DeleteBoardModal from "./DeleteBoardModal";
import CurrencyUnit, { getCurrencyUnit } from "../../../etc/currency-unit";
import placeholder_600x400 from "../../../assets/placeholder_600x400.svg";
import { useTranslation } from "react-i18next";
import { Languages } from "../../../etc/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { PageType } from "../../../utils/enum";

const { Title, Text } = Typography;

export default function DashboardBoardsPage() {
  const { t, i18n } = useTranslation();
  const { theme } = useSelector((state: RootState) => state.theme);

  const emptyBoard: BoardResponse = {
    id: 0,
    title: "",
    currencyUnit: CurrencyUnit.kVND.code,
    createdAt: "",
    updatedAt: "",
    language: i18n.language,
  };

  const [messageApi, contextHolder] = message.useMessage();
  const { showBoundary } = useErrorBoundary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBoard, setModalBoard] = useState(emptyBoard);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const getBoardsInfo = useQuery<BoardResponse[]>({
    queryKey: ["listBoards"],
    initialData: [],
    queryFn: BoardService.listBoards,
  }); 

  const boardMutation = useMutation({
    mutationFn: async (board: BoardResponse) => {
      if (board.id) {
        await BoardService.update(board.id, {
          title: board.title,
        });
      } else {
        await BoardService.create({
          title: board.title,
          currencyUnit: board.currencyUnit,
          language: board.language,
        });
      }
    },
    onSuccess: () => {
      setIsModalOpen(false);
      messageApi.success({
        content: t("success"),
      });
      getBoardsInfo.refetch();
    },
    onError: (err) => {
      handleError(err, showBoundary, messageApi, t);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: BoardService.delete,
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      messageApi.success({
        content: t("success"),
      });
      getBoardsInfo.refetch();
    },
    onError: (err) => {
      handleError(err, showBoundary, messageApi, t);
    },
  });

  if (getBoardsInfo.isFetching) return <SkeletonLoading type={PageType.board}/>

  return (
    <>
      {contextHolder}
      <Flex vertical gap="middle" className="p-4">
        <Title level={2} className="mb-0">
          {t("boards")}
        </Title>
        <Flex>
          <Button
            type="primary"
            onClick={() => {
              setModalBoard(emptyBoard);
              setIsModalOpen(true);
            }}
          >
            {t("newBoard")}
          </Button>
        </Flex>
        <Row gutter={[16, 16]}>
          {getBoardsInfo.data.map((item, index) => (
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              key={index}
            >
              <Card
                cover={<img src={placeholder_600x400} />}
                bordered={false}
                style={{ background: theme.palette.background.default }}
                actions={[
                  <Button
                    key="view"
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      navigate(`/boards/${item.id}`);
                    }}
                    icon={<LaunchOutlined fontSize="small" />}
                    style={{ background: theme.palette.background.default }}
                  ></Button>,
                  <Button
                    key="edit"
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      const board = getBoardsInfo.data.find(
                        (b) => b.id === item.id
                      );
                      setModalBoard(board || emptyBoard);
                      setIsModalOpen(true);
                    }}
                    icon={<EditOutlined fontSize="small" />}
                    style={{
                      background: theme.palette.background.default,
                      color: theme.palette.text.primary,
                    }}
                  ></Button>,
                  <Button
                    key="delete"
                    size="small"
                    color="danger"
                    variant="outlined"
                    onClick={() => {
                      const board = getBoardsInfo.data.find(
                        (b) => b.id === item.id
                      );
                      setModalBoard(board || emptyBoard);
                      setIsDeleteModalOpen(true);
                    }}
                    icon={<DeleteOutline fontSize="small" />}
                    style={{ background: theme.palette.background.default }}
                  ></Button>,
                ]}
              >
                <Card.Meta
                  title={item.title}
                  description={
                    <Flex vertical>
                      <Text
                        type="secondary"
                        style={{ color: theme.palette.text.primary }}
                      >
                        {t("currencyUnit")}:{" "}
                        {getCurrencyUnit(item.currencyUnit)?.label}
                      </Text>
                      <Text
                        type="secondary"
                        style={{ color: theme.palette.text.primary }}
                      >
                        {t("language")}:{" "}
                        {Languages[item.language as keyof typeof Languages]}
                      </Text>
                    </Flex>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>
      <BoardModal
        isLoading={boardMutation.isPending}
        isOpen={isModalOpen}
        board={modalBoard}
        onSubmit={boardMutation.mutate}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <DeleteBoardModal
        board={modalBoard}
        isLoading={deleteBoardMutation.isPending}
        isOpen={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
        onConfirmDelete={deleteBoardMutation.mutate}
      />
    </>
  );
}
