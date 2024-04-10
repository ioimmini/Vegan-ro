import {
  Container,
  InnerContainer,
  TextBox,
  SubTextBox,
  Text,
  TagContainer,
  ButtonContainer,
  VeganTagContainer,
  Icon,
} from './EditMyPage.styles';
import Navbar from '@/components/Navbar/Navbar';
import { IoInformationCircle } from 'react-icons/io5';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import VeganTag from '../../components/VeganTag/VeganTag';
import InputBox from '../../components/InputBox/InputBox';

export default function EditMyPage({ title = '프로필 설정' }) {
  return (
    <Container>
      <Navbar icon="null" title={title} />
      <InnerContainer>
        <TextBox>
          <SubTextBox>
            <Text color="#383838" fontSize={20}>
              닉네임
            </Text>
          </SubTextBox>
          <InputBox placeholder="닉네임을 입력해주세요" />
        </TextBox>
        <TagContainer>
          <SubTextBox>
            <Text color="#383838" fontSize={20}>
              채식 유형
            </Text>
            <Icon>
              <IoInformationCircle size="20" />
            </Icon>
          </SubTextBox>
          <TagContainer>
            <VeganTagContainer>
              <VeganTag title="비건" />
              <VeganTag title="락토" />
              <VeganTag title="오보" />
              <VeganTag title="락토-오보" />
              <VeganTag title="페스코" />
              <VeganTag title="플로" />
              <VeganTag title="플렉시테리언" />
            </VeganTagContainer>
          </TagContainer>
        </TagContainer>
        <ButtonContainer>
          <SecondaryButton
            title="취소"
            color="gray"
            onClick={() => navigator('/user')}
          />
          <SecondaryButton title="저장하기" color="green" />
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
}
