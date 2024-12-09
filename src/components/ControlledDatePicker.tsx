import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Button, DatePicker, Flex } from "antd";
import dayjs from "dayjs";

export interface ControlledDatePickerProps {
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
}

export default function ControlledDatePicker({
  value,
  onChange,
}: ControlledDatePickerProps) {
  return (
    <Flex justify="center" align="center" gap="small">
      <Button
        size="small"
        icon={<ArrowLeftOutlined fontSize="small" />}
        type="text"
        onClick={() => {
          if (onChange) {
            const d = value || dayjs();
            onChange(d.subtract(1, "day"));
          }
        }}
      ></Button>
      <DatePicker onChange={onChange} value={value} />
      <Button
        size="small"
        icon={<ArrowRightOutlined fontSize="small" />}
        type="text"
        onClick={() => {
          if (onChange) {
            const d = value || dayjs();
            onChange(d.add(1, "day"));
          }
        }}
      ></Button>
    </Flex>
  );
}
