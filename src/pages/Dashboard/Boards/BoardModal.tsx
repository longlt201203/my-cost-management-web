import { Button, Form, Input, Modal, Select } from "antd";
import { BoardResponse } from "../../../apis/board.service";
import { useEffect } from "react";
import CurrencyUnit from "../../../etc/currency-unit";
import { useTranslation } from "react-i18next";
import { Languages } from "../../../etc/i18n";

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
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(board);
  }, [board]);

  return (
    <Modal
      closable={false}
      maskClosable={!isLoading}
      cancelText={t("cancel")}
      cancelButtonProps={{ disabled: isLoading }}
      open={isOpen}
      title={board.id ? t("updateBoard") : t("newBoard")}
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
            {t("save")}
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
        <Form.Item<BoardResponse> label={t("title")} name="title">
          <Input placeholder={t("enterTitle")} />
        </Form.Item>
        {!board.id && (
          <>
            <Form.Item<BoardResponse>
              label={t("currencyUnit")}
              name="currencyUnit"
            >
              <Select
                placeholder={t("selectCurrencyUnit")}
                showSearch
                options={Object.values(CurrencyUnit).map((item) => ({
                  value: item.code,
                  label: item.label,
                }))}
              />
            </Form.Item>
            <Form.Item<BoardResponse> label={t("language")} name="language">
              <Select
                placeholder={t("selectLanguage")}
                showSearch
                options={Object.entries(Languages).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}
