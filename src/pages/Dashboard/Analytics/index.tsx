import { Col, Flex, message, Row, Select, Table, Typography } from "antd";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import { useEffect, useState } from "react";
import BoardService, {
  BoardResponse,
  DailyAnalysisResponse,
  ExtractedRecordResponse,
} from "../../../apis/board.service";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export interface DailyAnalysisTableItemType extends ExtractedRecordResponse {
  index: number;
  key: string;
}

export default function DashboardAnalyticsPage() {
  const { boardId } = useParams();

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const [dailyAnalytics, setDailyAnalytics] = useState<DailyAnalysisResponse>();
  const [boards, setBoards] = useState<BoardResponse[]>([]);

  const fetchBoards = async () => {
    try {
      const boards = await BoardService.listBoards();
      setBoards(boards);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  const fetchDailyAnalytics = async () => {
    try {
      const dailyAnalytics = await BoardService.getDailyAnalysis(
        Number(boardId)
      );
      setDailyAnalytics(dailyAnalytics);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    if (boardId) {
      fetchDailyAnalytics();
    }
  }, [boardId]);

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
          />
        </Flex>
        <Flex vertical gap="small">
          <Title level={4}>Daily</Title>
          <Flex>
            <ControlledDatePicker />
          </Flex>
          <Table<DailyAnalysisTableItemType>
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
            footer={() => (
              <Flex vertical>
                <Text>
                  <Text strong>Tổng chi tiêu:</Text> {dailyAnalytics?.total}
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
