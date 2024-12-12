import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Button, DatePicker, DatePickerProps, Flex } from "antd";
import dayjs from "dayjs";

export interface ControlledDatePickerProps {
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  picker?: DatePickerProps["picker"];
  format?: string;
  maxDate?: dayjs.Dayjs;
}

export default function ControlledDatePicker({
  value,
  onChange,
  picker,
  format,
  maxDate,
}: ControlledDatePickerProps) {
  const currentDate = value || dayjs();

  return (
    <Flex justify="center" align="center" gap="small">
      <Button
        size="small"
        icon={<ArrowLeftOutlined fontSize="small" />}
        type="text"
        onClick={() => {
          if (onChange) {
            const d = currentDate || dayjs();
            onChange(d.subtract(1, "day"));
          }
        }}
      ></Button>
      <DatePicker
        onChange={(v) => onChange && onChange(dayjs.utc(v))}
        value={currentDate}
        picker={picker}
        format={format}
        maxDate={maxDate}
      />
      <Button
        size="small"
        icon={<ArrowRightOutlined fontSize="small" />}
        type="text"
        onClick={() => {
          if (onChange) {
            let d = currentDate || dayjs();
            onChange(d.add(1, "day"));
          }
        }}
        disabled={
          maxDate &&
          (dayjs(value).isSame(maxDate, "date") ||
            dayjs(value).isAfter(maxDate, "date"))
        }
      ></Button>
    </Flex>
  );
}
