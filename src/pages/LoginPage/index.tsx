import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import AuthService from "../../apis/auth.service";
import handleError from "../../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

const { Title, Link } = Typography;

interface LoginBasicFormType {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const { t } = useTranslation();
  // i18n.changeLanguage(localStorage.getItem("currentLanguage") || undefined);

  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();

  const initValues: LoginBasicFormType = {
    email: "",
    password: "",
    remember: false,
  };

  const onSubmit = async (values: LoginBasicFormType) => {
    try {
      const data = await AuthService.loginBasic({
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      window.location.href = "/";
    } catch (err) {
      handleError(err, showBoundary, messageApi);
    }
  };

  return (
    <>
      {contextHolder}
      <Flex
        vertical
        justify="center"
        align="center"
        className="mx-auto max-w-sm min-h-screen"
      >
        <Title level={2}>{t("login")}</Title>
        <Form<LoginBasicFormType>
          className="p-8 rounded-lg shadow-lg w-full"
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
      </Flex>
    </>
  );
}
