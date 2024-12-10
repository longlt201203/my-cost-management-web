import { Button, Flex, message, Skeleton, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BoardService, { BoardResponse } from "../../../apis/board.service";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import RecordService, {
  ListRecordsQuery,
  RecordResponse,
} from "../../../apis/record.service";
import dayjs from "dayjs";
import RecordModal from "./RecordModal";
import { ArrowBack, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import DeleteRecordModal from "./DeleteRecordModal";
import ControlledDatePicker from "../../../components/ControlledDatePicker";

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

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTimeout, setCurrentTimeout] = useState<number>();
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
  const [listRecordsQuery, setListRecordsQuery] = useState<ListRecordsQuery>({
    date: dayjs(searchParams.get("date") || undefined).toDate(),
  });
  const [isRecordTableLoading, setIsRecordTableLoading] = useState(false);

  const fetchBoard = async () => {
    try {
      const board = await BoardService.getBoard(Number(boardId));
      setBoard(board);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  const fetchRecords = async () => {
    setIsRecordTableLoading(true);
    try {
      const records = await RecordService.listRecords(
        Number(boardId),
        listRecordsQuery
      );
      setBoardRecords(records);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
    setIsRecordTableLoading(false);
  };

  const updateListRecordsQuery = (data: ListRecordsQuery) => {
    const newQuery = {
      ...listRecordsQuery,
      ...data,
    };
    setListRecordsQuery(newQuery);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  useEffect(() => {
    setBoardRecords([]);
    setIsRecordTableLoading(true);
    if (currentTimeout) clearTimeout(currentTimeout);
    setCurrentTimeout(
      setTimeout(() => {
        const searchParams = new URLSearchParams();
        if (listRecordsQuery.date)
          searchParams.set("date", listRecordsQuery.date.toISOString());
        setSearchParams(searchParams);
        fetchRecords();
      }, 500)
    );
  }, [listRecordsQuery]);

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
            <Flex vertical gap="large">
              <Flex align="center" gap="large">
                <Button
                  type="text"
                  shape="circle"
                  icon={<ArrowBack />}
                  onClick={() => navigate('/boards')}
                />
                <Title level={2} style={{ marginBottom: 0 }}>
                  {board?.title}
                </Title>
              </Flex>
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
                <Button
                  onClick={() => {
                    navigate(`/analytics/${boardId}`);
                  }}
                >
                  View Analysis
                </Button>
              </Flex>
              <Flex>
                <ControlledDatePicker
                  value={dayjs(listRecordsQuery.date)}
                  onChange={(v) =>
                    updateListRecordsQuery({
                      date: v?.toDate(),
                    })
                  }
                  format="DD/MM/YYYY"
                  maxDate={dayjs()}
                />
              </Flex>
              <Table<RecordTableItemType>
                loading={isRecordTableLoading}
                pagination={false}
                dataSource={boardRecords.map((item, index) => ({
                  ...item,
                  index: index + 1,
                  createdAt: dayjs(item.createdAt).format("HH:mm:ss"),
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
                    render: (_, record) =>
                      dayjs().isSame(dayjs(listRecordsQuery.date), "date") && (
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
