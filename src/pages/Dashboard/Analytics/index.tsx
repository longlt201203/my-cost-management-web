import { Col, Flex, message, Row, Select, Table, Typography } from "antd";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import { useEffect, useState } from "react";
import BoardService, {
  BoardResponse,
  DailyAnalysisResponse,
  ExtractedRecordResponse,
  GetDailyAnalysisQuery,
} from "../../../apis/board.service";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export interface DailyAnalysisTableItemType extends ExtractedRecordResponse {
  index: number;
  key: string;
}

export default function DashboardAnalyticsPage() {
  const { boardId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyAnalysisResponse>();
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [board, setBoard] = useState<BoardResponse>();
  const [getDailyAnalysisQuery, setGetDailyAnalysisQuery] =
    useState<GetDailyAnalysisQuery>({
      date: dayjs(searchParams.get("date") || undefined).toDate(),
    });
  const [getDailyAnalysisTimeout, setGetDailyAnalysisTimeout] =
    useState<number>();
  const [isDailyAnalysisLoading, setIsDailyAnalysisLoading] = useState(false);

  const fetchBoards = async () => {
    try {
      const boards = await BoardService.listBoards();
      setBoards(boards);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  const fetchBoard = async () => {
    try {
      const board = await BoardService.getBoard(Number(boardId));
      setBoard(board);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  const fetchDailyAnalytics = async () => {
    setIsDailyAnalysisLoading(true);
    try {
      const dailyAnalytics = await BoardService.getDailyAnalysis(
        Number(boardId),
        getDailyAnalysisQuery
      );
      setDailyAnalytics(dailyAnalytics);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
    setIsDailyAnalysisLoading(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (boardId) {
      fetchBoard();
    }
  }, [boardId]);

  useEffect(() => {
    if (boardId) {
      setIsDailyAnalysisLoading(true);
      setDailyAnalytics(undefined);
      if (getDailyAnalysisTimeout) clearTimeout(getDailyAnalysisTimeout);
      setGetDailyAnalysisTimeout(
        setTimeout(() => {
          const searchParams = new URLSearchParams();
          if (getDailyAnalysisQuery.date)
            searchParams.set("date", getDailyAnalysisQuery.date.toISOString());
          setSearchParams(searchParams);
          fetchDailyAnalytics();
        }, 500)
      );
    }
  }, [boardId, getDailyAnalysisQuery]);

  const updateGetDailyAnalysisQuery = (data: GetDailyAnalysisQuery) => {
    const newQuery = {
      ...getDailyAnalysisQuery,
      ...data,
    };
    setGetDailyAnalysisQuery(newQuery);
  };

  return (
    <>
      {contextHolder}
      <Flex className="p-4" gap="middle" vertical>
        <Title level={2}>Analytics</Title>
        <Flex>
          <Select
            options={boards.map((board) => ({
              label: board.title,
              value: board.id,
            }))}
            placeholder="Select board"
            onChange={(v) => {
              navigate(`/analytics/${v}`);
            }}
            value={board?.id}
          />
        </Flex>
        <Flex vertical gap="small">
          <Title level={4}>Daily</Title>
          <Flex>
            <ControlledDatePicker
              value={dayjs(getDailyAnalysisQuery.date)}
              onChange={(v) =>
                updateGetDailyAnalysisQuery({ date: v?.toDate() })
              }
              format="DD/MM/YYYY"
              maxDate={dayjs()}
            />
          </Flex>
          <Table<DailyAnalysisTableItemType>
            pagination={false}
            columns={[
              {
                key: "index",
                dataIndex: "index",
                title: "#",
              },
              {
                dataIndex: "description",
                key: "description",
                title: "Description",
              },
              {
                dataIndex: "time",
                key: "time",
                title: "Time",
              },
              {
                dataIndex: "amount",
                key: "amount",
                title: "Amount",
                render: (value) => `${value} ${board?.currencyUnit}`,
              },
              {
                dataIndex: "paymentMethod",
                key: "paymentMethod",
                title: "Payment Method",
              },
              {
                dataIndex: "location",
                key: "location",
                title: "Location",
              },
              {
                dataIndex: "notes",
                key: "notes",
                title: "Notes",
              },
            ]}
            dataSource={dailyAnalytics?.extractedRecords.map((item, index) => ({
              ...item,
              index: index + 1,
              key: String(item.id),
              time: dayjs(item.time).format("HH:mm:ss"),
            }))}
            scroll={{ x: 768 }}
            loading={isDailyAnalysisLoading}
            footer={() => (
              <Flex vertical>
                <Text>
                  <Text strong>Total Spent:</Text> {dailyAnalytics?.total}{" "}
                  {board?.currencyUnit}
                </Text>
              </Flex>
            )}
          />
        </Flex>
        <Row gutter={[16, 16]}>
          <Col
            lg={{
              span: 12,
            }}
            span={24}
          >
            <Flex vertical gap="small">
              <Title level={4}>Monthly</Title>
              <Flex>
                <ControlledDatePicker picker="month" />
              </Flex>
            </Flex>
          </Col>
          <Col
            lg={{
              span: 12,
            }}
            span={24}
          >
            <Flex vertical gap="small">
              <Title level={4}>Yearly</Title>
              <Flex>
                <ControlledDatePicker picker="year" />
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </>
  );
}
