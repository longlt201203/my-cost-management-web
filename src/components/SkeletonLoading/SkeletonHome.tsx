import { Flex, Skeleton } from 'antd'

const SkeletonHome = () => {
    return (
        <Flex vertical gap="middle" className="p-4">
            <Skeleton.Node 
                active
                style={{ width: "300px", height: "40px" }}
                className='mt-2 mb-2'
            />
            <Skeleton
                active
                title={false}
                paragraph={{ rows: 18 }}
                className='mt-4 mb-4'
            />
        </Flex>
    )
}

export default SkeletonHome