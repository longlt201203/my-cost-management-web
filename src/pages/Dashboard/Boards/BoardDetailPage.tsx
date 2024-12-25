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
import RecordModal, { RecordModalFormType } from "./RecordModal";
import { ArrowBack, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import DeleteRecordModal from "./DeleteRecordModal";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../../etc/debouce";

const { Title } = Typography;

export interface RecordTableItemType extends RecordResponse {
  index: number;
  key: string;
}

export default function BoardDetailPage() {
  const emptyRecord: RecordModalFormType = {
    id: 0,
    content: "",
    createdAt: dayjs(),
  };

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardResponse>();
  const [boardRecords, setBoardRecords] = useState<RecordResponse[]>([]);
  const [currentRecord, setCurrentRecord] =
    useState<RecordModalFormType>(emptyRecord);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isRecordModalLoading, setIsRecordModalLoading] = useState(false);
  const [isDeleteRecordModalOpen, setIsDeleteRecordModalOpen] = useState(false);
  const [isDeleteRecordModalLoading, setIsDeleteRecordModalLoading] =
    useState(false);
  const [listRecordsQuery, setListRecordsQuery] = useState<ListRecordsQuery>({
    date: dayjs(searchParams.get("date") || undefined)
      .startOf("date")
      .toDate(),
  });
  const [isRecordTableLoading, setIsRecordTableLoading] = useState(false);

  const fetchBoard = async () => {
    try {
      const board = await BoardService.getBoard(Number(boardId));
      setBoard(board);
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
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
      handleError(err, showBoundary, messageApi, t);
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

  const changeSearchParamsAndRefetch = useDebounce(() => {
    const searchParams = new URLSearchParams();
    if (listRecordsQuery.date)
      searchParams.set("date", listRecordsQuery.date.toISOString());
    setSearchParams(searchParams);
    fetchRecords();
  }, 500);

  useEffect(() => {
    fetchBoard();
  }, []);

  useEffect(() => {
    setBoardRecords([]);
    setIsRecordTableLoading(true);
    changeSearchParamsAndRefetch();
  }, [listRecordsQuery]);

  const handleModalFormSubmit = async (record: RecordModalFormType) => {
    console.log(record);
    setIsRecordModalLoading(true);
    try {
      if (record.id) {
        await RecordService.updateRecord(Number(boardId), record.id, {
          content: record.content,
          createdAt: record.createdAt.toDate(),
        });
      } else {
        await RecordService.createRecord(Number(boardId), {
          content: record.content,
          createdAt: record.createdAt.toDate(),
        });
      }
      setIsRecordModalOpen(false);
      messageApi.success({
        content: t("success"),
      });
      fetchRecords();
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
    setIsRecordModalLoading(false);
  };

  const handleDeleteRecord = async (recordId: number) => {
    setIsDeleteRecordModalLoading(true);
    try {
      await RecordService.deleteRecord(Number(boardId), recordId);
      setIsDeleteRecordModalOpen(false);
      messageApi.success({
        content: t("success"),
      });
      fetchRecords();
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
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
                  onClick={() => navigate("/boards")}
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
                  {t("addRecord")}
                </Button>
                <Button
                  onClick={() => {
                    navigate(`/analytics/${boardId}`);
                  }}
                >
                  {t("viewAnalytics")}
                </Button>
              </Flex>
              <Flex>
                <ControlledDatePicker
                  value={dayjs(listRecordsQuery.date)}
                  onChange={(v) =>
                    updateListRecordsQuery({
                      date: v.toDate(),
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
                    title: t("content"),
                    key: "content",
                  },
                  {
                    dataIndex: "createdAt",
                    title: t("createdAt"),
                    key: "createdAt",
                    render: (value) => dayjs(value).format("HH:mm:ss"),
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
                            console.log(record.createdAt);
                            setCurrentRecord({
                              ...record,
                              createdAt: dayjs(record.createdAt),
                            });
                            setIsRecordModalOpen(true);
                          }}
                        ></Button>
                        <Button
                          size="small"
                          color="danger"
                          variant="outlined"
                          icon={<DeleteOutlined fontSize="small" />}
                          onClick={() => {
                            setCurrentRecord({
                              ...record,
                              createdAt: dayjs(record.createdAt),
                            });
                            setIsDeleteRecordModalOpen(true);
                          }}
                        ></Button>
                      </Flex>
                    ),
                  },
                ]}
                scroll={{ x: 720 }}
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
        recordId={currentRecord.id}
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
