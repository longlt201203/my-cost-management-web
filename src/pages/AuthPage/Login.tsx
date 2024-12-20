import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";

const { Link } = Typography;

interface LoginBasicFormType {
  email: string;
  password: string;
  remember: boolean;
}

const initValues: LoginBasicFormType = {
  email: "",
  password: "",
  remember: false,
};

export default function Login() {
  const { t } = useTranslation();

  const onSubmit = async (values: LoginBasicFormType) => {
    const code = btoa(`${values.email}:${values.password}`);
    const searchParams = new URLSearchParams();
    searchParams.set("code", code);
    searchParams.set("callback", `${window.location.origin}/`);
    window.location.href = `/api/auth/2/basic?${searchParams.toString()}`;
  };

  return (
    <Form<LoginBasicFormType>
      className="p-8 rounded-lg shadow-lg"
      size="large"
      layout="vertical"
      initialValues={initValues}
      onFinish={onSubmit}
    >
      <Form.Item<LoginBasicFormType> name="email" label="Email">
        <Input
          prefix={<AccountCircleOutlinedIcon fontSize="small" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item<LoginBasicFormType> name="password" label={t("password")}>
        <Input.Password
          prefix={<PasswordOutlinedIcon fontSize="small" />}
          placeholder={t("password")}
        />
      </Form.Item>
      <Form.Item<LoginBasicFormType> name="remember">
        <Flex justify="space-between">
          <Checkbox>{t("rememberMe")}</Checkbox>
          <Link>{t("forgotPassword")}</Link>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          {t("login")}
        </Button>
      </Form.Item>
    </Form>
  );
}
