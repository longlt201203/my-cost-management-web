import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

export default function DashboardBoardsPage() {
  return (
    <div className="p-4">
      <Title level={2}>Boards</Title>
      <Row gutter={[16, 16]}>
        {Array.from({ length: 15 }, (_, index) => (
          <Col
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <Card
              key={index}
              cover={<img src="https://placehold.co/600x400" />}
              bordered={false}
              hoverable
              onClick={() => {}}
            >
              <Card.Meta title="Card Title" description="Board description" />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
