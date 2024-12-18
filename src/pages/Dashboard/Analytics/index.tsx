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
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import AnalysisService, { AnalysisDTO, MonthlyAnalysisChartResponse, MonthlyAnalysisResponse, YearlyAnalysisChartResponse, YearlyAnalysisResponse } from "../../../apis/analysis.service";

const { Title, Text } = Typography;

export interface DailyAnalysisTableItemType extends ExtractedRecordResponse {
  index: number;
  key: string;
}

export default function DashboardAnalyticsPage() {
  const { boardId } = useParams();
  const { t } = useTranslation();
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
  const [monthlyAnalysis, setMonthlyAnalysis] = useState<MonthlyAnalysisResponse>();
  const [monthlyChartData, setMonthlyChartData] = useState<MonthlyAnalysisChartResponse>();
  const [yearlyAnalysis, setYearlyAnalysis] = useState<YearlyAnalysisResponse>();
  const [yearlyChartData, setYearlyChartData] = useState<YearlyAnalysisChartResponse>();

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

  // Monthly Analysis
  const fetchMonthlyAnalysis = async () => {
    try {
      const dto: AnalysisDTO = {
        boardId: Number(boardId),
        date: dayjs(),
        timezone: "Asia/Ho_Chi_Minh",
      }
      const data = await AnalysisService.getMonthlyAnalysis(dto);
      setMonthlyAnalysis(data);
      const dataChart = await AnalysisService.getMonthAnalysisChart(dto);
      setMonthlyChartData(dataChart);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  useEffect(() => {
    fetchMonthlyAnalysis();
  }, []);

  useEffect(() => {
    if (boardId) {
      fetchMonthlyAnalysis();
    }
  }, [boardId]);

  //Yearly Analysis
  const fetchYearlyAnalysis = async () => {
    try {
      const dto: AnalysisDTO = {
        boardId: Number(boardId),
        date: dayjs(),
        timezone: "Asia/Ho_Chi_Minh"
      };
      const data = await AnalysisService.getYearlyAnalysis(dto);
      setYearlyAnalysis(data);
      const dataChart = await AnalysisService.getYearlyAnalysisChart(dto);
      setYearlyChartData(dataChart);
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  useEffect(() => {
    fetchYearlyAnalysis();
  }, []);

  useEffect(() => {
    if (boardId) {
      fetchYearlyAnalysis();
    }
  }, [boardId]);

  return (
    <>
      {contextHolder}
      <Flex className="p-4" gap="middle" vertical>
        <Title level={2} className="mb-0">
          {t("analytics")}
        </Title>
        <Flex>
          <Select
            options={boards.map((board) => ({
              label: board.title,
              value: board.id,
            }))}
            placeholder={t("selectBoard")}
            onChange={(v) => {
              navigate(`/analytics/${v}`);
            }}
            value={board?.id}
          />
        </Flex>
        <Flex vertical gap="small">
          <Title level={4}>{t("daily")}</Title>
          <Flex>
            <ControlledDatePicker
              value={dayjs(getDailyAnalysisQuery.date)}
              onChange={(v) =>
                updateGetDailyAnalysisQuery({ date: v.toDate() })
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
                title: t("description"),
              },
              {
                dataIndex: "time",
                key: "time",
                title: t("time"),
              },
              {
                dataIndex: "amount",
                key: "amount",
                title: t("amount"),
                render: (value) => `${value} ${board?.currencyUnit}`,
              },
              {
                dataIndex: "paymentMethod",
                key: "paymentMethod",
                title: t("paymentMethod"),
              },
              {
                dataIndex: "location",
                key: "location",
                title: t("location"),
              },
              {
                dataIndex: "notes",
                key: "notes",
                title: t("notes"),
              },
            ]}
            dataSource={dailyAnalytics?.extractedRecords.map((item, index) => ({
              ...item,
              index: index + 1,
              key: String(item.id),
              time: dayjs(item.time).format("HH:mm:ss"),
            }))}
            scroll={{ x: 1280 }}
            loading={isDailyAnalysisLoading}
            footer={() => (
              <Flex vertical>
                <Text>
                  <Text strong>{t("totalSpent")}:</Text> {dailyAnalytics?.total}{" "}
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
              <Title level={4}>{t("monthly")}</Title>
              <Flex>
                <ControlledDatePicker picker="month" />
              </Flex>
              <Chart
                type="bar"
                options={{
                  dataLabels: {
                    enabled: false,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 4,
                    },
                  },
                  chart: {
                    toolbar: {
                      show: false,
                    },
                  },
                }}
                series={[
                  {
                    name: "Daily Spent",
                    // data: Array.from({ length: 30 }, () =>
                    //   Math.floor(1 + Math.random() * 100)
                    // ),
                    data: monthlyChartData?.charts ? monthlyChartData.charts : []
                  },
                ]}
              />
              <Text>
                <Text strong>{t("totalSpent")}:</Text> {monthlyAnalysis?.total}{" "}
                {board?.currencyUnit}
              </Text>
            </Flex>
          </Col>
          <Col
            lg={{
              span: 12,
            }}
            span={24}
          >
            <Flex vertical gap="small">
              <Title level={4}>{t("yearly")}</Title>
              <Flex>
                <ControlledDatePicker picker="year" />
              </Flex>
              <Chart
                type="bar"
                options={{
                  dataLabels: {
                    enabled: false,
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 4,
                    },
                  },
                  chart: {
                    toolbar: {
                      show: false,
                    },
                  },
                }}
                series={[
                  {
                    name: "Yearly Spent",
                    // data: Array.from({ length: 12 }, () =>
                    //   Math.floor(1 + Math.random() * 100)
                    // ),
                    data: yearlyChartData?.charts ? yearlyChartData.charts : [],
                  },
                ]}
              />
              <Text>
                <Text strong>{t("totalSpent")}:</Text> {yearlyAnalysis?.total}{" "}
                {board?.currencyUnit}
              </Text>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </>
  );
}
