import { Skeleton } from 'antd';
import _ from 'lodash';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { IFormLoader } from '../treeHierachyMaintenanceForms';

interface ITreeHierachyFormsSkeleton {
  formId: string;
  showSkeleton: IFormLoader;
  setShowSkeleton: (showSkeleton: IFormLoader) => void;
}

export const TreeHierachyFormsSkeleton: FC<ITreeHierachyFormsSkeleton> = ({
  formId,
  showSkeleton,
  setShowSkeleton,
}) => {
  useEffect(() => {
    if (!_.isEmpty(formId)) {
      const justMoment = setTimeout(() => {
        setShowSkeleton({ showSkeleton: true, doneLoading: false });
        clearTimeout(justMoment);
      }, 1000);
    }
  }, [formId]);

  useEffect(() => {
    if (showSkeleton) {
      const justMoment = setTimeout(() => {
        setShowSkeleton({ showSkeleton: false, doneLoading: true });
        clearTimeout(justMoment);
      }, 3000);
    }
  }, [showSkeleton]);

  if (showSkeleton?.showSkeleton || !showSkeleton?.doneLoading) return <Skeleton active />;

  return <div />;
};

export default TreeHierachyFormsSkeleton;
