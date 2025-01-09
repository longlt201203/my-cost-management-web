import { Flex, Skeleton } from 'antd';

const SkeletonAnalytics = () => {
    return (
        <Flex vertical gap="middle" className="p-4">
            <Skeleton
                active
                title={{ width: "50%" }}
                paragraph={false}
                className='mt-4 mb-4'
            />
        </Flex>
    )
}

export default SkeletonAnalytics