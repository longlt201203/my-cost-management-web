import { Card, Col, Flex, Row, Skeleton } from 'antd';

const SkeletonBoard = () => {
    return (
        <Flex vertical gap="middle" className="p-4">
            <Skeleton.Node 
                active
                style={{ width: "300px", height: "40px" }}
                className='mt-2 mb-2'
            />
            <Skeleton.Button active style={{ width: 100 }} />
            <Row gutter={[16, 16]}>
                {Array(4).fill(null).map(() => (
                    <Col
                        xs={{ span: 24 }}
                        md={{ span: 12 }}
                        lg={{ span: 8 }}
                        xl={{ span: 6 }}
                    >
                        <Card
                            loading={true}
                            cover={
                                <Skeleton.Image
                                    active
                                    style={{
                                        width: '100%',
                                        height: "100%",
                                        aspectRatio: "3/2"
                                    }}
                                />
                            }
                            bordered={false}
                        >
                            <Card.Meta />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Flex>
    )
}

export default SkeletonBoard;