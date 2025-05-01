import HistoryDonationVolunteerTable from '@/components/user/history-donation-volunteer/HistoryDonationVolunteerTable';
import SummaryHistoryUser from '@/components/user/history-donation-volunteer/SummaryHistoryUser';
import React from 'react';

const DonateHistoryPage = () => {
  return (
    <div className='px-2 md:px-4 max-w-7xl mx-auto space-y-6'>
      <SummaryHistoryUser />
      <HistoryDonationVolunteerTable />
    </div>
  );
};

export default DonateHistoryPage;
