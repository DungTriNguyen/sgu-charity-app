import { CAMPAIGN_ROLE } from '@/app/enum';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCampaignRole = (key: string) => {
  switch (key) {
    case 'individual':
      return CAMPAIGN_ROLE.INDIVIDUAL;
    case 'organization':
      return CAMPAIGN_ROLE.ORIGANIZATION;
    default:
      return;
  }
};

export const formatCurrencyToVND = (value: number): string => {
  return (
    value
      .toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      })
      .replace('₫', '')
      .trim() + ' VNĐ'
  );
};
