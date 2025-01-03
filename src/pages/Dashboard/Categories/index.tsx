import { Button, Flex, message, Table, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import CategoriesService, {
  CategoryResponse,
} from "../../../apis/categories.service";
import { useEffect, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import CategoryModal from "./CategoryModal";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useAuth } from "../../../contexts/auth.context";

const { Title } = Typography;

export interface CategoryTableItemType extends CategoryResponse {
  index: number;
  key: string;
}

export default function DashboardCategoriesPage() {
  const { t, i18n } = useTranslation();
  const { profile } = useAuth();
  const emptyCategory: CategoryResponse = {
    id: 0,
    name: "",
    color: "",
  };
  const [messageApi, contextHolder] = message.useMessage();
  const { showBoundary } = useErrorBoundary();
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(emptyCategory);
  const [categoryModalLoading, setCategoryModalLoading] = useState(false);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [deleteCategoryModalLoading, setDeleteCategoryModalLoading] =
    useState(false);

  const fetchCategories = async () => {
    setDeleteIds([]);
    setIsCategoriesLoading(true);
    try {
      const categories = await CategoriesService.listCategories({
        language: i18n.language,
      });
      setCategories(categories);
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
    setIsCategoriesLoading(false);
  };

  const saveCategory = async (category: CategoryResponse) => {
    setCategoryModalLoading(true);
    try {
      if (category.id) {
        await CategoriesService.update(category.id, {
          name: category.name,
          color: category.color,
        });
      } else {
        await CategoriesService.create({
          name: category.name,
          language: i18n.language,
          color: category.color,
        });
      }
      messageApi.success({
        content: t("success"),
      });
      setCategoryModalOpen(false);
      fetchCategories();
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
    setCategoryModalLoading(false);
  };

  const deleteCategories = async () => {
    setDeleteCategoryModalLoading(true);
    try {
      await CategoriesService.delete({
        ids: deleteIds,
      });
      setDeleteCategoryModalOpen(false);
      fetchCategories();
      messageApi.success({
        content: t("success"),
      });
    } catch (err) {
      handleError(err, showBoundary, messageApi, t);
    }
    setDeleteCategoryModalLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [i18n.language]);

  return (
    <>
      {contextHolder}
      <Flex className="p-4" gap="middle" vertical>
        <Title level={2} className="mb-0">
          {t("categories")}
        </Title>
        <Flex gap="small">
          <Button
            type="primary"
            onClick={() => {
              setModalCategory(emptyCategory);
              setCategoryModalOpen(true);
            }}
          >
            {t("addCategory")}
          </Button>
          <Button
            variant="solid"
            color="danger"
            disabled={deleteIds.length == 0}
            onClick={() => {
              setDeleteCategoryModalOpen(true);
            }}
          >
            {t("delete")}
          </Button>
        </Flex>
        <Table<CategoryTableItemType>
          loading={isCategoriesLoading}
          rowSelection={{
            type: "checkbox",
            onChange: (ids) => {
              setDeleteIds(ids.map(Number));
            },
            getCheckboxProps: (record) => ({
              disabled: record.accountId != profile.id,
            }),
            selectedRowKeys: deleteIds.map(String),
          }}
          dataSource={categories.map((item, index) => ({
            ...item,
            index: index + 1,
            key: String(item.id),
          }))}
          columns={[
            {
              key: "index",
              dataIndex: "index",
              title: "#",
            },
            {
              key: "name",
              dataIndex: "name",
              title: t("name"),
              render: (value, record) => (
                <Tag color={record.color}>{value}</Tag>
              ),
            },
            {
              key: "actions",
              render: (_, category) => (
                <Flex gap="small" justify="center" align="center">
                  <Button
                    disabled={category.accountId != profile.id}
                    size="small"
                    variant="outlined"
                    icon={<EditOutlined fontSize="small" />}
                    onClick={() => {
                      setModalCategory(category);
                      setCategoryModalOpen(true);
                    }}
                  ></Button>
                </Flex>
              ),
            },
          ]}
        />
      </Flex>
      <CategoryModal
        category={modalCategory}
        open={categoryModalOpen}
        onSubmit={saveCategory}
        onCancel={() => {
          setCategoryModalOpen(false);
        }}
        loading={categoryModalLoading}
      />
      <DeleteCategoryModal
        open={deleteCategoryModalOpen}
        loading={deleteCategoryModalLoading}
        onCancel={() => {
          setDeleteCategoryModalOpen(false);
        }}
        onOk={deleteCategories}
      />
    </>
  );
}
