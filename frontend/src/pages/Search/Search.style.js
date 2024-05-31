import styled from 'styled-components';

import SmallRoundButton from '@/components/SmallRoundButton/SmallRoundButton';
import MapButton from '@/components/MapButton/MapButton';

export const Wrapper = styled.main`
  padding: 0 16px 16px 16px;
  width: 100%;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
`;
export const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const SearchNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0;

  background-color: #f7f9f0;
  position: sticky;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
`;

export const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 999;
  width: 100%;
  margin-top: 12px;
`;

export const FilterButton = styled(SmallRoundButton)`
  position: relative;
`;

export const ScrollableList = styled.div`
  overflow: auto;
  max-height: 88%;
`;

export const BottomBar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 16px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
`;
export const MapViewButton = styled(MapButton)`
  &.map-view-button {
  }
`;
