import React, { useEffect } from "react";
import {CommodityManagement} from "../features/Commodities/CommodityManagement";
import { useAppDispatch } from "../store";
import { setPageTitle } from "../store/appSlice";

export const CommodityManagementPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Commodity Management"));
  }, []);

  return <CommodityManagement />;
};
