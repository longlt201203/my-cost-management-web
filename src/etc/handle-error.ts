import { MessageInstance } from "antd/es/message/interface";
import { AxiosError, HttpStatusCode } from "axios";

export default function handleError(
  err: any,
  showBoundary: (err: any) => void,
  messageApi: MessageInstance
) {
  if (err instanceof AxiosError && err.response) {
    if (err.response.status == HttpStatusCode.BadRequest) {
      messageApi.error({
        content: err.response.data.message || "Bad request error",
      });
      return;
    } else if (err.response.status == HttpStatusCode.Unauthorized) {
      window.location.href = "/login";
      return;
    }
  }
  showBoundary(err);
}
