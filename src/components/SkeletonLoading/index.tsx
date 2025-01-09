import { PageType } from '../../utils/enum';
import SkeletonBoard from './SkeletonBoard';
import SkeletonAnalytics from './SkeletonAnalytics';
import SkeletonCategory from './SkeletonCategory';
import SkeletonHome from './SkeletonHome';

interface SkeletonCustom {
    type: PageType;
}

const SkeletonLoading = ({ type }: SkeletonCustom) => {
    switch (type) {
        case PageType.home:
            return <SkeletonHome/>
        case PageType.board:
            return <SkeletonBoard/>
        case PageType.analytics:
            return <SkeletonAnalytics/>
        case PageType.category:
            return <SkeletonCategory/>
    }
}

export default SkeletonLoading;