import { Button, Card, Col, Flex, message, Row, Typography } from "antd";
import { useEffect, useState } from "react";
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

const { Title, Text } = Typography;

export default function DashboardBoardsPage() {
  const { t, i18n } = useTranslation();

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

  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [modalBoard, setModalBoard] = useState(emptyBoard);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteModalLoading, setIsDeleteModalLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const boards = await BoardService.listBoards();
      setBoards(boards);
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleBoardModalSubmit = async (board: BoardResponse) => {
    setIsModalLoading(true);
    try {
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
      setIsModalOpen(false);
      messageApi.success({
        content: t("success"),
      });
      fetchBoards();
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
    setIsModalLoading(false);
  };

  const handleConfirmDelete = async (boardId: number) => {
    setIsDeleteModalLoading(true);
    try {
      await BoardService.delete(boardId);
      setIsDeleteModalOpen(false);
      messageApi.success({
        content: t("success"),
      });
      fetchBoards();
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
    setIsDeleteModalLoading(false);
  };

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
          {boards.map((item, index) => (
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
                  ></Button>,
                  <Button
                    key="edit"
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      const board = boards.find((b) => b.id === item.id);
                      setModalBoard(board || emptyBoard);
                      setIsModalOpen(true);
                    }}
                    icon={<EditOutlined fontSize="small" />}
                  ></Button>,
                  <Button
                    key="delete"
                    size="small"
                    color="danger"
                    variant="outlined"
                    onClick={() => {
                      const board = boards.find((b) => b.id === item.id);
                      setModalBoard(board || emptyBoard);
                      setIsDeleteModalOpen(true);
                    }}
                    icon={<DeleteOutline fontSize="small" />}
                  ></Button>,
                ]}
              >
                <Card.Meta
                  title={item.title}
                  description={
                    <Flex vertical>
                      <Text type="secondary">
                        {t("currencyUnit")}:{" "}
                        {getCurrencyUnit(item.currencyUnit)?.label}
                      </Text>
                      <Text type="secondary">
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
        isLoading={isModalLoading}
        isOpen={isModalOpen}
        board={modalBoard}
        onSubmit={handleBoardModalSubmit}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <DeleteBoardModal
        board={modalBoard}
        isLoading={isDeleteModalLoading}
        isOpen={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
