import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { PageType } from "../../../utils/enum";

const { Title } = Typography;

export default function DashboardHomePage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 3000);
  }, []);

  if (isLoading) return <SkeletonLoading type={PageType.home}/>

  return (
    <div className="p-4">
      <Title level={2}>{t("home")}</Title>
    </div>
  );
}
