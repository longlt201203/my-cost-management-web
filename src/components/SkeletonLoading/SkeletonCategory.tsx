import { Flex, Skeleton, Table } from 'antd'

const SkeletonCategory = () => {
    return (
        <Flex vertical gap="middle" className="p-4">
            <Skeleton.Node 
                active
                style={{ width: "300px", height: "40px" }}
                className='mt-2 mb-2'
            />
            <Flex gap="middle">
                <Skeleton.Button active style={{ width: 100 }} />
                <Skeleton.Button active style={{ width: 50 }} />
            </Flex>
            <Table
                columns={[
                    {
                        key: "index",
                        dataIndex: "index",
                        title: <Skeleton active paragraph={false} style={{ width: "20%" }}/>,
                        width: "25%"
                      },
                      {
                        key: "content",
                        dataIndex: "content",
                        title: <Skeleton active paragraph={false} style={{ width: "20%" }}/>,
                      },
                      {
                        key: "actions",
                        render: (_) => (
                            <Flex>
                                <Skeleton.Button active shape='circle'/>
                            </Flex>
                        ),
                        width: "15%"
                      },
                      
                ]}
                dataSource={Array(7).fill(null).map((_, index) => ({
                    key: index,
                    index: <Skeleton active paragraph={false}/>,
                    content: <Skeleton paragraph={false}/>,
                }))}
            />
        </Flex>
    )
}

export default SkeletonCategory