import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import handleError from "../../etc/handle-error";
import { useErrorBoundary } from "react-error-boundary";
import AccountService from "../../apis/account.service";
import AuthService from "../../apis/auth.service";

interface RegisterFormType {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initValues: RegisterFormType = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const { t } = useTranslation();
  const { showBoundary } = useErrorBoundary();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<RegisterFormType>();

  const handleRegister = async (values: RegisterFormType) => {
    try {
      await AccountService.createAccount({
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
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
      <Form<RegisterFormType>
        className="p-8 rounded-lg shadow-lg"
        size="large"
        layout="vertical"
        initialValues={initValues}
        form={form}
        onFinish={handleRegister}
      >
        <Form.Item<RegisterFormType>
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: t("emailRequired"),
            },
            {
              type: "email",
              message: t("emailInvalid"),
            },
          ]}
        >
          <Input
            placeholder="Email"
            prefix={<AccountCircleOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item<RegisterFormType>
          name="phone"
          label={t("phone")}
          rules={[
            {
              required: true,
              message: t("phoneRequired"),
            },
            {
              pattern: /^[0-9\b]+$/,
              message: t("phoneInvalid"),
            },
          ]}
        >
          <Input
            placeholder={t("phone")}
            prefix={<LocalPhoneOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item<RegisterFormType>
          name="password"
          label={t("password")}
          rules={[
            {
              required: true,
              message: t("passwordRequired"),
            },
          ]}
        >
          <Input.Password
            placeholder={t("password")}
            prefix={<PasswordOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item<RegisterFormType>
          name="confirmPassword"
          label={t("confirmPassword")}
          rules={[
            {
              validator: (_, v, cb) => {
                let err = undefined;
                if (v != form.getFieldValue("password")) {
                  err = t("passwordNotMatch");
                }
                cb(err);
              },
            },
          ]}
        >
          <Input.Password
            placeholder={t("confirmPassword")}
            prefix={<PasswordOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {t("register")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
