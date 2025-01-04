import { MessageInstance } from "antd/es/message/interface";
import { AxiosError, HttpStatusCode } from "axios";
import { TFunction } from "i18next";

export default function handleError(
  err: unknown,
  showBoundary: (err: unknown) => void,
  messageApi: MessageInstance,
  t: TFunction<"translation", undefined>
) {
  console.log(err);
  if (err instanceof AxiosError && err.response) {
    if (err.response.status == HttpStatusCode.BadRequest) {
      messageApi.error({
        content: err.response.data.code
          ? t(err.response.data.code)
          : t("badRequest"),
      });
      return;
    } else if (err.response.status == HttpStatusCode.Unauthorized) {
      window.location.href = "/auth";
      return;
    }
  }
  showBoundary(err);
}
