import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { Button, DatePicker, DatePickerProps, Flex } from "antd";
import dayjs from "dayjs";

export interface ControlledDatePickerProps {
  value?: dayjs.Dayjs;
  onChange?: (value: dayjs.Dayjs) => void;
  picker?: DatePickerProps["picker"];
  format?: string;
  maxDate?: dayjs.Dayjs;
  disabled?: boolean;
}

export default function ControlledDatePicker({
  value,
  onChange,
  picker,
  format,
  maxDate,
  disabled,
}: ControlledDatePickerProps) {
  const currentDate = value || dayjs();
  const unit = picker == "month" ? "month" : picker == "year" ? "year" : "day";

  return (
    <Flex justify="center" align="center" gap="small">
      <Button
        size="small"
        icon={<ArrowLeftOutlined fontSize="small" />}
        type="text"
        onClick={() => {
          if (onChange) {
            const d = currentDate || dayjs();
            onChange(d.subtract(1, unit));
          }
        }}
        disabled={disabled}
      ></Button>
      <DatePicker
        onChange={(v) => onChange && onChange(v ? v : dayjs())}
        value={currentDate}
        picker={picker}
        format={format}
        maxDate={maxDate}
        disabled={disabled}
      />
      <Button
        size="small"
        icon={<ArrowRightOutlined fontSize="small" />}
        type="text"
        onClick={() => {
          if (onChange) {
            let d = currentDate || dayjs();
            onChange(d.add(1, unit));
          }
        }}
        disabled={
          (maxDate &&
            (dayjs(currentDate).isSame(maxDate, "date") ||
              dayjs(currentDate).isAfter(maxDate, "date"))) ||
          disabled
        }
      ></Button>
    </Flex>
  );
}
