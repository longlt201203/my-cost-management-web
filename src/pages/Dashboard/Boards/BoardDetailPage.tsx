import { Button, Flex, message, Skeleton, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardService, { BoardResponse } from "../../../apis/board.service";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import RecordService, { RecordResponse } from "../../../apis/record.service";
import dayjs from "dayjs";
import RecordModal from "./RecordModal";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import DeleteRecordModal from "./DeleteRecordModal";

const { Title } = Typography;

export interface RecordTableItemType extends RecordResponse {
  index: number;
  key: string;
}

export default function BoardDetailPage() {
  const emptyRecord: RecordResponse = {
    id: 0,
    content: "",
    createdAt: "",
  };

  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardResponse>();
  const [boardRecords, setBoardRecords] = useState<RecordResponse[]>([]);
  const [currentRecord, setCurrentRecord] =
    useState<RecordResponse>(emptyRecord);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isRecordModalLoading, setIsRecordModalLoading] = useState(false);
  const [isDeleteRecordModalOpen, setIsDeleteRecordModalOpen] = useState(false);
  const [isDeleteRecordModalLoading, setIsDeleteRecordModalLoading] =
    useState(false);

  const fetchBoard = async () => {
    try {
      const board = await BoardService.getBoard(Number(boardId));
      setBoard(board);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  const fetchRecords = async () => {
    try {
      const records = await RecordService.listRecords(Number(boardId));
      setBoardRecords(records);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  useEffect(() => {
    fetchBoard();
    fetchRecords();
  }, []);

  const handleModalFormSubmit = async (record: RecordResponse) => {
    setIsRecordModalLoading(true);
    try {
      if (record.id) {
        await RecordService.updateRecord(Number(boardId), record.id, {
          content: record.content,
        });
      } else {
        await RecordService.createRecord(Number(boardId), {
          content: record.content,
        });
      }
      setIsRecordModalOpen(false);
      messageApi.success({
        content: "Success!",
      });
      fetchRecords();
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
    setIsRecordModalLoading(false);
  };

  const handleDeleteRecord = async (recordId: number) => {
    setIsDeleteRecordModalLoading(true);
    try {
      await RecordService.deleteRecord(Number(boardId), recordId);
      setIsDeleteRecordModalOpen(false);
      messageApi.success({
        content: "Success!",
      });
      fetchRecords();
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
    setIsDeleteRecordModalLoading(false);
  };

  return (
    <>
      {contextHolder}
      <div className="p-4">
        {board ? (
          <>
            <Flex vertical gap="middle">
              <Title level={2}>{board?.title}</Title>
              <Flex gap="small">
                <Button
                  type="primary"
                  onClick={() => {
                    setCurrentRecord(emptyRecord);
                    setIsRecordModalOpen(true);
                  }}
                >
                  Add Record
                </Button>
                <Button onClick={() => {}}>View Analysis</Button>
              </Flex>
              <Table<RecordTableItemType>
                dataSource={boardRecords.map((item, index) => ({
                  ...item,
                  index: index + 1,
                  createdAt: dayjs(item.createdAt).format(
                    "DD/MM/YYYY HH:mm:ss"
                  ),
                  key: item.id.toString(),
                }))}
                columns={[
                  {
                    dataIndex: "index",
                    title: "#",
                    key: "index",
                  },
                  {
                    dataIndex: "content",
                    title: "Content",
                    key: "content",
                  },
                  {
                    dataIndex: "createdAt",
                    title: "Created At",
                    key: "createdAt",
                  },
                  {
                    key: "actions",
                    render: (_, record) => (
                      <Flex gap="small" justify="center" align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          icon={<EditOutlined fontSize="small" />}
                          onClick={() => {
                            setCurrentRecord(record);
                            setIsRecordModalOpen(true);
                          }}
                        ></Button>
                        <Button
                          size="small"
                          color="danger"
                          variant="outlined"
                          icon={<DeleteOutlined fontSize="small" />}
                          onClick={() => {
                            setCurrentRecord(record);
                            setIsDeleteRecordModalOpen(true);
                          }}
                        ></Button>
                      </Flex>
                    ),
                  },
                ]}
              />
            </Flex>
          </>
        ) : (
          <Skeleton active />
        )}
      </div>
      <RecordModal
        record={currentRecord}
        isOpen={isRecordModalOpen}
        isLoading={isRecordModalLoading}
        onCancel={() => {
          setIsRecordModalOpen(false);
        }}
        onSubmit={handleModalFormSubmit}
      />
      <DeleteRecordModal
        record={currentRecord}
        isOpen={isDeleteRecordModalOpen}
        isLoading={isDeleteRecordModalLoading}
        onCancel={() => {
          setIsDeleteRecordModalOpen(false);
        }}
        onConfirmDelete={handleDeleteRecord}
      />
    </>
  );
}
