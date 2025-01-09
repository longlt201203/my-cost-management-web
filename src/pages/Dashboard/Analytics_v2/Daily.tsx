import { Button, Flex } from "antd";
import { BoardResponse } from "../../../apis/board.service";
import ControlledDatePicker from "../../../components/ControlledDatePicker";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export interface DailyProps {
  board: BoardResponse;
}

export default function Daily({ board }: DailyProps) {
  const { t } = useTranslation();

  return (
    <>
      <Flex vertical>
        <Flex gap="small">
          <ControlledDatePicker
            value={dayjs()}
            onChange={(v) => {}}
            format="DD/MM/YYYY"
            maxDate={dayjs()}
          />
          <Button type="primary" loading={false} onClick={() => {}}>
            {t("re-analyze")}
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
