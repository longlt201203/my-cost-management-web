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
      <DatePicker
        onChange={onChange}
        value={value}
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
            let d = value || dayjs();
            onChange(d.add(1, "day"));
          }
        }}
        disabled={maxDate?.isSame(value, "date")}
      ></Button>
    </Flex>
  );
}
