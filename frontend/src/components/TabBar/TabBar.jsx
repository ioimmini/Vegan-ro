import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  useGetReviewsByUserId,
  useGetReportedByUserId,
  useGetBookmarkedByUserId,
} from '../../hooks/useUser';
import PlaceCard from '@/components/Card/Card';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import {
  Container,
  TabContainerParent,
  TabContainer,
  Tab,
  TabContent,
  DataContent,
} from './TabBar.styles';
import {
  ReviewContent,
  NoReview,
  NoReviewText,
} from '@/components/Review/Review.styles';
import getDistance from '../../hooks/useDistance';
import useCurrentLocation from '../../hooks/useCurrentLocation';

const TabBar = () => {
  const { ref, inView } = useInView();

  const {
    data: ReviewsData,
    isError: isReviewsError,
    error: reviewsError,
    isLoading: reviewsLoading,
    isFetchingNextPage: reviewsFetchingNextPage,
    hasNextPage: reviewsHasNextPage,
    fetchNextPage: reviewsFetchNextPage,
  } = useGetReviewsByUserId();
  const {
    data: ReportData,
    isError: isReportError,
    error: reportError,
    isLoading: reportLoading,
    isFetchingNextPage: reportFetchingNextPage,
    hasNextPage: reportHasNextPage,
    fetchNextPage: reportFetchNextPage,
  } = useGetReportedByUserId();
  const {
    data: BookmarkData,
    isError: isBookmarkError,
    error: bookmarkError,
    isLoading: bookmarkLoading,
    isFetchingNextPage: bookmarkFetchingNextPage,
    hasNextPage: bookmarkHasNextPage,
    fetchNextPage: bookmarkFetchNextPage,
  } = useGetBookmarkedByUserId();
  const {
    location: userLocation,
    error: userLocationError,
    isLoading: userLocationLoading,
    reloadLocation: getCurrentPosition,
  } = useCurrentLocation();
  const [activeTab, setActiveTab] = useState('reported');
  const tabContentRef = useRef(null);
  useEffect(() => {
    getCurrentPosition();
  }, []);
  useEffect(() => {
    if (inView && reviewsHasNextPage) {
      reviewsFetchNextPage();
    }
    if (inView && reportHasNextPage) {
      reportFetchNextPage();
    }
    if (inView && bookmarkHasNextPage) {
      bookmarkFetchNextPage();
    }
  }, [
    inView,
    reviewsHasNextPage,
    reviewsFetchNextPage,
    reportHasNextPage,
    reportFetchNextPage,
    bookmarkHasNextPage,
    bookmarkFetchNextPage,
  ]);

  if (
    userLocationLoading ||
    ReportData === undefined ||
    ReviewsData === undefined ||
    BookmarkData === undefined
  ) {
    return <div>Loading...</div>;
  }

  if (userLocationError || isReviewsError || isReportError || isBookmarkError) {
    return <div>Error occurred while loading data.</div>;
  }

  const renderReportedPlaces = () => {
    if (ReportData.length === 0) {
      return (
        <ReviewContent>
          <NoReview>
            <NoReviewText>제보한 가게가 없습니다.</NoReviewText>
          </NoReview>
        </ReviewContent>
      );
    } else {
      return (
        <DataContent>
          {ReportData?.pages.map((page) =>
            page.map((report) => {
              const distance =
                getDistance({
                  lat1: userLocation.center.lat,
                  lon1: userLocation.center.lng,
                  lat2: report.location[1],
                  lon2: report.location[0],
                }) / 1000;

              return (
                <PlaceCard
                  key={report._id}
                  name={report.name}
                  veganOption={report.vegan_option ? '일부 비건' : '비건'}
                  distance={distance}
                  location={report.address}
                  number={report.tel === '' ? '없음' : report.tel}
                  img={report.category_img.url.basic_url}
                />
              );
            }),
          )}
          <div ref={ref}>
            {reportFetchingNextPage ? (
              <div>Loading more...</div>
            ) : reportHasNextPage ? (
              <div>Load More</div>
            ) : (
              'No more reviews'
            )}
          </div>
        </DataContent>
      );
    }
  };

  const renderReviews = () => {
    if (ReviewsData.length === 0) {
      return (
        <ReviewContent>
          <NoReview>
            <NoReviewText>작성한 리뷰가 없습니다.</NoReviewText>
          </NoReview>
        </ReviewContent>
      );
    } else {
      return (
        <DataContent>
          {ReviewsData?.pages.map((page) =>
            page.map((review) => (
              <ReviewCard
                key={review._id}
                nickname={review.user_id.nickname}
                veganLevel={review.user_id.tag}
                comment={review.content}
                date={review.updatedAt}
              />
            )),
          )}
          <div ref={ref}>
            {reviewsFetchingNextPage ? (
              <div>Loading more...</div>
            ) : reviewsHasNextPage ? (
              <div>Load More</div>
            ) : (
              'No more reviews'
            )}
          </div>
        </DataContent>
      );
    }
  };

  const renderBookmarkedPlaces = () => {
    if (BookmarkData.length === 0) {
      return (
        <ReviewContent>
          <NoReview>
            <NoReviewText>북마크한 가게가 없습니다.</NoReviewText>
          </NoReview>
        </ReviewContent>
      );
    } else {
      return (
        <DataContent>
          {BookmarkData?.pages.map((page) =>
            page.map((bookmark) => {
              const distance =
                getDistance({
                  lat1: userLocation.center.lat,
                  lon1: userLocation.center.lng,
                  lat2: bookmark.place_id.location.coordinates[1],
                  lon2: bookmark.place_id.location.coordinates[0],
                }) / 1000;

              return (
                <PlaceCard
                  key={bookmark._id}
                  name={bookmark.place_id.name}
                  veganOption={
                    bookmark.place_id.vegan_option ? '일부 비건' : '비건'
                  }
                  distance={distance}
                  location={bookmark.place_id.address}
                  number={bookmark.place_id.tel}
                  img={bookmark.place_id.category_img.url.basic_url}
                />
              );
            }),
          )}
          <div ref={ref}>
            {bookmarkFetchingNextPage ? (
              <div>Loading more...</div>
            ) : bookmarkHasNextPage ? (
              <div>Load More</div>
            ) : (
              'No more reviews'
            )}
          </div>
        </DataContent>
      );
    }
  };

  return (
    <Container>
      <TabContainerParent>
        <TabContainer>
          <Tab
            active={activeTab === 'reported'}
            onClick={() => setActiveTab('reported')}
          >
            제보한 가게
          </Tab>
          <Tab
            active={activeTab === 'review'}
            onClick={() => setActiveTab('review')}
          >
            작성 후기
          </Tab>
          <Tab
            active={activeTab === 'bookmark'}
            onClick={() => setActiveTab('bookmark')}
          >
            북마크
          </Tab>
        </TabContainer>
      </TabContainerParent>
      <TabContent
        ref={tabContentRef}
        style={{ display: activeTab ? 'block' : 'none' }}
      >
        {activeTab === 'reported' && renderReportedPlaces()}
        {activeTab === 'review' && renderReviews()}
        {activeTab === 'bookmark' && renderBookmarkedPlaces()}
      </TabContent>
    </Container>
  );
};

export default TabBar;
