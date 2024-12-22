import { Button, Flex, Form, Input, message, Typography } from "antd";
import { useAuth } from "../../../contexts/auth.context";
import { AuthProfileResponse } from "../../../apis/auth.service";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const { Title } = Typography;

export default function DashboardAccountPage() {
  const [_, contextHolder] = message.useMessage();
  const { profile } = useAuth();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(profile);
  }, [profile]);

  return (
    <>
      {contextHolder}
      <Flex className="p-4" gap="middle" vertical>
        <Title level={2} className="mb-0">
          {t("account")}
        </Title>
        <Flex>
          <Form<AuthProfileResponse> layout="vertical" form={form}>
            <Form.Item<AuthProfileResponse> name="email" label="Email">
              <Input disabled />
            </Form.Item>
            <Form.Item<AuthProfileResponse> name="phone" label={t("phone")}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button>{t("save")}</Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </>
  );
}
