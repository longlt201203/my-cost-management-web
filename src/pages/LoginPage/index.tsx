import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";

const { Title, Link } = Typography;

interface LoginBasicFormType {
  username: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  return (
    <Flex
      vertical
      gap="large"
      justify="center"
      align="center"
      className="min-h-screen"
    >
      <Title level={2}>Login Page</Title>
      <Form className="p-8 rounded-lg shadow-lg" size="large">
        <Flex vertical gap="small">
          <Form.Item<LoginBasicFormType> name="username" label="Username">
            <Input
              prefix={<AccountCircleOutlinedIcon fontSize="small" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item<LoginBasicFormType> name="password" label="Password">
            <Input.Password
              prefix={<PasswordOutlinedIcon fontSize="small" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item<LoginBasicFormType> name="remember">
            <Flex justify="space-between">
              <Checkbox>Remember me</Checkbox>
              <Link>Forgot password?</Link>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
}
