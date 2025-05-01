import { useQuery } from '@tanstack/react-query';
import { useAxiosAuth } from './use-axios-auth';
import { CAMPAIGN_ROLE, CAMPAIGN_TYPE } from '@/app/enum';

const useGetProjectQuery = ({
  role,
  keyword,
  front_status,
  type,
  page,
  limit,
  category,
  user_id,
}: {
  type?: CAMPAIGN_TYPE;
  role?: CAMPAIGN_ROLE;
  keyword?: string;
  front_status?: string;
  category?: string;
  page?: number;
  limit?: number;
  user_id?: number;
}) => {
  const apiAuth = useAxiosAuth();
  return useQuery<TProjectResponse>({
    queryKey: [
      'project_list',
      role,
      keyword,
      type,
      front_status,
      category,
      user_id,
      page,
      limit,
    ],
    queryFn: async () => {
      try {
        const res = await apiAuth.get('/project', {
          params: { role, keyword, user_id, page, limit },
        });

        const result = res.data?.data.filter((item: TCampaign) => {
          if (!(front_status || type || category)) return item;
          return (
            (!!front_status
              ? item.front_status_label === front_status
              : item) &&
            (!!type ? item.type === type : item) &&
            (!!category ? `${item.category.id}` === category : item)
          );
        });

        return {
          data: result,
          total: res.data?.total || 0,
          current_page: res.data?.current_page || 1,
          per_page: res.data?.per_page || limit,
        };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
      }
    },
  });
};

const useGetProjectByID = ({ slug }: { slug: string }) => {
  const apiAuth = useAxiosAuth();
  return useQuery<TApiResponse<TCampaign>, Error>({
    queryKey: ['get-detail-project', slug],
    queryFn: async () => {
      try {
        const res = await apiAuth.get(`/project?project_slug=${slug}`);
        console.log('res kkkkkkkkkkkkkkk:', res.data);
        return res.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
      }
    },
  });
};

export { useGetProjectQuery, useGetProjectByID };
