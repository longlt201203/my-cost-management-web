import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";

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
  const [_, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Form<RegisterFormType>
        className="p-8 rounded-lg shadow-lg"
        size="large"
        layout="vertical"
        initialValues={initValues}
      >
        <Form.Item<RegisterFormType> name="email" label="Email">
          <Input
            placeholder="Email"
            prefix={<AccountCircleOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item<RegisterFormType> name="phone" label={t("phone")}>
          <Input
            placeholder={t("phone")}
            prefix={<LocalPhoneOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item<RegisterFormType> name="password" label={t("password")}>
          <Input.Password
            placeholder={t("password")}
            prefix={<PasswordOutlinedIcon fontSize="small" />}
          />
        </Form.Item>
        <Form.Item<RegisterFormType>
          name="confirmPassword"
          label={t("confirmPassword")}
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
