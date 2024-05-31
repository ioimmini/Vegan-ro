import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getReviewsByPlaceId,
  postReview,
  deleteReview,
  updateReview,
} from '../apis/api/reviewApi';

export const useGetReviews = (
  placeId,
  pageNumber = 1, // default page number is 1
  pageSize = 10, // default page size is 10
) => {
  return useQuery({
    queryKey: ['getReviewsByPlaceId', placeId, pageNumber, pageSize],
    queryFn: () => getReviewsByPlaceId(placeId, pageNumber, pageSize),
    config: {
      retry: false,
    },
  });
};

export const useGetReviewsByPlaceId = (placeId, pageSize = 10) => {
  return useInfiniteQuery({
    queryKey: ['reviews', placeId],
    queryFn: ({ pageParam }) =>
      getReviewsByPlaceId(placeId, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};

export const usePostReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      queryClient.invalidateQueries('reviews');
    },
  });
};
export const useUpdateReview = () => {
  return useMutation({ mutationFn: updateReview });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries('reviews');
    },
  });
};
