import { useState } from 'react';
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
import { updateUserData } from '../../apis/api/userInfoApi';
import { useNavigate } from 'react-router-dom';

export default function EditMyPage({ title = '프로필 설정', nickname }) {
  const [newNickname, setNewNickname] = useState(nickname);
  const [activeTag, setActiveTag] = useState('');
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    console.log(tag);
  };
  const handleSave = async () => {
    try {
      await updateUserData({ nickname: newNickname, tag: activeTag });
      console.log('저장완료');
      navigate(`/user/:userid`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('이미 사용 중인 닉네임입니다.');
      } else {
        console.error(error);
      }
    }
  };

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
          <InputBox
            placeholder="닉네임을 입력해주세요"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
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
              <VeganTag
                title="비건"
                isActive={activeTag === '비건'}
                onClick={() => handleTagClick('비건')}
              />
              <VeganTag
                title="락토"
                isActive={activeTag === '락토'}
                onClick={() => handleTagClick('락토')}
              />
              <VeganTag
                title="오보"
                isActive={activeTag === '오보'}
                onClick={() => handleTagClick('오보')}
              />
              <VeganTag
                title="락토-오보"
                isActive={activeTag === '락토-오보'}
                onClick={() => handleTagClick('락토-오보')}
              />
              <VeganTag
                title="페스코"
                isActive={activeTag === '페스코'}
                onClick={() => handleTagClick('페스코')}
              />
              <VeganTag
                title="플로"
                isActive={activeTag === '플로'}
                onClick={() => handleTagClick('플로')}
              />
              <VeganTag
                title="플렉시테리언"
                isActive={activeTag === '플렉시테리언'}
                onClick={() => handleTagClick('플렉시테리언')}
              />
            </VeganTagContainer>
          </TagContainer>
        </TagContainer>
        <ButtonContainer>
          <SecondaryButton
            title="취소"
            color="gray"
            onClick={() => navigator('/user')}
          />
          <SecondaryButton
            title="저장하기"
            color="green"
            onClick={handleSave}
          />
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
}
