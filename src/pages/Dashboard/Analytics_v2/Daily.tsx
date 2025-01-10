import { Button, Empty, Flex, message, Table, Tag, Typography } from "antd";
import BoardService, {
  BoardResponse,
  ExtractedRecordResponse,
} from "../../../apis/board.service";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../etc/debouce";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import { CategoryResponse } from "../../../apis/categories.service";
import AnalysisService from "../../../apis/analysis.service";

const { Text } = Typography;

export interface DailyAnalysisTableItemType extends ExtractedRecordResponse {
  index: number;
  key: string;
}

export interface DailyProps {
  board: BoardResponse;
}

export default function Daily({ board }: DailyProps) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const { showBoundary } = useErrorBoundary();
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState(
    dayjs(searchParams.get("date") || new Date())
  );

  const getDailyAnalysisInfo = useQuery({
    queryKey: ["getDailyAnalysis", board.id],
    queryFn: () =>
      BoardService.getDailyAnalysis(board.id, {
        date: date.toDate(),
      }),
    enabled: false,
  });
  const dailyAnalytics = getDailyAnalysisInfo.data;

  if (getDailyAnalysisInfo.error) {
    handleError(getDailyAnalysisInfo.error, showBoundary, messageApi, t);
  }

  const updateSearchParams = useDebounce((v: dayjs.Dayjs) => {
    setSearchParams({ date: v.format("YYYY-MM-DD") });
    getDailyAnalysisInfo.refetch();
  }, 500);

  useEffect(() => {
    updateSearchParams(date);
  }, [date]);

  const analyzeManuallyMutation = useMutation({
    mutationFn: () =>
      AnalysisService.analyzeDaily({
        boardId: board.id,
        date: date.toDate(),
      }),
    onSuccess: () => {
      messageApi.success(t("success"));
      getDailyAnalysisInfo.refetch();
    },
    onError: (error) => {
      handleError(error, showBoundary, messageApi, t);
    },
  });

  const isLoading =
    getDailyAnalysisInfo.isPending || analyzeManuallyMutation.isPending;

  return (
    <>
      {contextHolder}
      <Flex vertical gap="middle">
        <Flex gap="small">
          <ControlledDatePicker
            value={date}
            onChange={(v) => setDate(v)}
            format="DD/MM/YYYY"
            maxDate={dayjs()}
            disabled={isLoading}
          />
          <Button
            type="primary"
            loading={false}
            onClick={() => analyzeManuallyMutation.mutate()}
            disabled={isLoading}
          >
            {t("re-analyze")}
          </Button>
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
              dataIndex: "categories",
              key: "categories",
              title: t("categories"),
              render: (value: CategoryResponse[]) => (
                <Flex gap="small">
                  {value.map((item) => (
                    <Tag key={item.id} color={item.color}>
                      {item.name}
                    </Tag>
                  ))}
                </Flex>
              ),
            },
            // {
            //   dataIndex: "paymentMethod",
            //   key: "paymentMethod",
            //   title: t("paymentMethod"),
            // },
            // {
            //   dataIndex: "location",
            //   key: "location",
            //   title: t("location"),
            // },
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
          loading={isLoading}
          footer={() => (
            <Flex vertical>
              <Text>
                <Text strong>{t("totalSpent")}:</Text> {dailyAnalytics?.total}{" "}
                {board?.currencyUnit}
              </Text>
            </Flex>
          )}
          locale={{ emptyText: <Empty description={t("noData")} /> }}
        />
      </Flex>
    </>
  );
}
