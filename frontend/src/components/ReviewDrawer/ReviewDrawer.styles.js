import styled from 'styled-components';
const TitleContainer = styled.div`
  align-self: stretch;
  height: 40px;
  padding-top: 12px;
  padding-bottom: 12px;
  justify-content: center;
  align-items: center;
  display: inline-flex;
`;
const Title = styled.button`
  text-align: center;
  color: #383838;
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: 600;
  word-wrap: break-word;
`;

const FormContentContainer = styled.div`
  align-self: stretch;
  height: 218px;
  padding-top: 16px;
  padding-bottom: 16px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  display: flex;
`;

const AddressInputContainer = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  display: inline-flex;
`;

const LocationIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
`;

const AddressText = styled.div`
  color: #383838;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  word-wrap: break-word;
`;

const ReviewTextAreaContainer = styled.div`
  width: 100%;
  height: 120px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
`;

const ReviewPlaceholder = styled.textarea`
  width: 100%;
  height: 100%;
  color: #c4c4c4;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  word-wrap: break-word;
  background: none;
  border: none;
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: #c4c4c4;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
`;

const SubmitButtonText = styled.button`
  color: white;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  word-wrap: break-word;
`;

export {
  TitleContainer,
  Title,
  FormContentContainer,
  AddressInputContainer,
  LocationIcon,
  AddressText,
  ReviewTextAreaContainer,
  ReviewPlaceholder,
  SubmitButtonContainer,
  SubmitButtonText,
};
