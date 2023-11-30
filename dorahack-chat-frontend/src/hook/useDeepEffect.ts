/* eslint-disable @typescript-eslint/no-explicit-any */

import { EffectCallback, useEffect, useRef } from 'react';
import _ from 'lodash';

const isArrayDeepEqual = (x: any[], y: any[]) => {
  if (x.length !== y.length) return false;
  return _(x).differenceWith(y, _.isEqual).isEmpty();
};

const useDeepComparison = (dependency: any[]) => {
  const ref = useRef<any[]>([]);
  if (!isArrayDeepEqual(ref.current, dependency) || !ref.current.length) {
    ref.current = dependency;
  }
  return ref.current;
};

export const useDeepEffect = (callback: EffectCallback, dependency: any[]) => {
  useEffect(callback, useDeepComparison(dependency));
};
