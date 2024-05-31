import React, { useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { ModalOverlay, ModalContent } from './KakaoAddress.styles';

const KakaoAddress = ({ onClose, onAddressSelect }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // 선택한 주소 정보를 부모 컴포넌트로 전달
    onAddressSelect(fullAddress);
    // 모달을 닫을 때 body의 스크롤을 다시 허용
    document.body.style.overflow = 'auto';
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <DaumPostcode onComplete={handleComplete} className="post-modal" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default KakaoAddress;
