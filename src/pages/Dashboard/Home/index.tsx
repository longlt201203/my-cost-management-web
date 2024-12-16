import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export default function DashboardHomePage() {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <Title level={2}>{t("home")}</Title>
    </div>
  );
}
