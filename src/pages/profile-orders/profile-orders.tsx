import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { getOrdersAll, getUserState } from '@slices/userSlice';
import { getFeeds } from '@slices/feedSlice';

export const ProfileOrders: FC = () => {
  const userOrders = useSelector(getUserState).userOrders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, []);

  return <ProfileOrdersUI orders={userOrders} />;
};
