import { Button, Flex, message, Table, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import CategoriesService, {
  CategoryResponse,
} from "../../../apis/categories.service";
import { useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import CategoryModal from "./CategoryModal";
import { useErrorBoundary } from "react-error-boundary";
import handleError from "../../../etc/handle-error";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { useAuth } from "../../../contexts/auth.context";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState(emptyCategory);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);

  const listCategoriesInfo = useQuery<CategoryResponse[]>({
    queryKey: ["listCategories", i18n.language],
    initialData: [],
    queryFn: ({ queryKey }) =>
      CategoriesService.listCategories({
        language: queryKey[1] as string,
      }),
  });

  const categoryMutation = useMutation({
    mutationFn: async (category: CategoryResponse) => {
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
    },
    onSuccess: () => {
      messageApi.success({
        content: t("success"),
      });
      setCategoryModalOpen(false);
      listCategoriesInfo.refetch();
    },
    onError: (err) => {
      handleError(err, showBoundary, messageApi, t);
    },
  });

  const deleteCategoriesMutation = useMutation({
    mutationFn: (ids: number[]) => CategoriesService.delete({ ids }),
    onSuccess: () => {
      setDeleteCategoryModalOpen(false);
      listCategoriesInfo.refetch();
      messageApi.success({
        content: t("success"),
      });
    },
    onError: (err) => {
      handleError(err, showBoundary, messageApi, t);
    },
  });

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
          loading={listCategoriesInfo.isLoading}
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
          dataSource={listCategoriesInfo.data.map((item, index) => ({
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
        onSubmit={categoryMutation.mutate}
        onCancel={() => {
          setCategoryModalOpen(false);
        }}
        loading={categoryMutation.isPending}
      />
      <DeleteCategoryModal
        open={deleteCategoryModalOpen}
        loading={deleteCategoriesMutation.isPending}
        onCancel={() => {
          setDeleteCategoryModalOpen(false);
        }}
        onOk={() => deleteCategoriesMutation.mutate(deleteIds)}
      />
    </>
  );
}
