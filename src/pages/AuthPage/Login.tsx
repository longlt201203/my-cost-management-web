import { Button, Checkbox, Flex, Form, Input, message, Typography } from "antd";
import { useTranslation } from "react-i18next";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import AuthService from "../../apis/auth.service";
import handleError from "../../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";

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
  const [messageApi, contextHolder] = message.useMessage();
  const { showBoundary } = useErrorBoundary();
  const { t } = useTranslation();

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
    </>
  );
}
