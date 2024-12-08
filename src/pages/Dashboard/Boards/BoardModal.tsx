import { Button, Form, Input, Modal, Select } from "antd";
import { BoardResponse } from "../../../apis/board.service";
import { useEffect } from "react";
import CurrencyUnit from "../../../etc/currency-unit";

export interface BoardModalProps {
  board: BoardResponse;
  isOpen?: boolean;
  onSubmit?: (values: BoardResponse) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function BoardModal({
  board,
  isOpen,
  onSubmit,
  isLoading,
  onCancel,
}: BoardModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(board);
  }, [board]);

  return (
    <Modal
      closable={false}
      maskClosable={!isLoading}
      cancelButtonProps={{ disabled: isLoading }}
      open={isOpen}
      title={board.id ? "Update Board" : "Create Board"}
      onCancel={onCancel}
      footer={(_, { CancelBtn }) => (
        <>
          <CancelBtn />
          <Button
            onClick={() => {
              form.submit();
            }}
            type="primary"
            loading={isLoading}
          >
            Save
          </Button>
        </>
      )}
    >
      <Form<BoardResponse>
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        disabled={isLoading}
      >
        <Form.Item<BoardResponse> hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item<BoardResponse> label="Title" name="title">
          <Input placeholder="Enter Title" />
        </Form.Item>
        {!board.id && (
          <Form.Item<BoardResponse> label="Currency Unit" name="currencyUnit">
            <Select
              placeholder="Select Currency Unit"
              showSearch
              options={Object.values(CurrencyUnit).map((item) => ({
                value: item.code,
                label: item.label,
              }))}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
