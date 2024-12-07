import { Flex, Typography } from "antd";
import errorPlaceholder from "../../assets/error-placeholder.svg";

const { Title } = Typography;

export default function NotFoundPage() {
  return (
    <Flex vertical justify="center" align="center" className="min-h-screen">
      <img src={errorPlaceholder} className="max-w-md" />
      <Title level={3}>404 - Not Found</Title>
    </Flex>
  );
}
