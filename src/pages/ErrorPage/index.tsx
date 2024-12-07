import { Flex, message, Typography } from "antd";
import { AxiosError, HttpStatusCode } from "axios";
import errorPlaceholder from "../../assets/error-placeholder.svg";
import { useEffect, useState } from "react";
import { ApiError } from "../../apis/axios.service";
import { FallbackProps } from "react-error-boundary";

const { Text, Title } = Typography;

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const [messageApi] = message.useMessage();
  const [statusCode, setStatusCode] = useState<number>(500);
  const [statusText, setStatusText] = useState<string>("Unknown Error");
  const [description, setDescription] = useState<string>();
  console.log(error);

  useEffect(() => {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as ApiError;
      setStatusCode(error.response.status);
      setStatusText(error.response.statusText);
      setDescription(data.message);
    }
  }, []);

  return (
    <Flex vertical justify="center" align="center" className="min-h-screen">
      <img src={errorPlaceholder} className="max-w-md" />
      <Title level={3}>
        {statusCode} - {statusText}
      </Title>
      {description && <Text type="secondary">{description}</Text>}
    </Flex>
  );
}
