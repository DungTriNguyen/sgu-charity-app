export enum CAMPAIGN_TYPE {
  DONATE = 'Quyên góp',
  VOLUNTEER = 'Tình nguyện',
  MULTIPLE = 'Quyên góp và tình nguyện',
}

export enum CAMPAIGN_ROLE {
  ORIGANIZATION = 'tổ chức gây quỹ',
  INDIVIDUAL = 'cá nhân gây quỹ',
}

export enum SETTING_TYPE {
  POLICY = 'policy',
  TERMS = 'terms',
  BANNER = 'banner',
  COMPANION_UNIT = 'companion_unit',
}

export enum CAMPAIGN_STATUS {
  IN_PROGRESS = 'Đang thực hiện',
  COMPLETED = 'Đạt mục tiêu',
  ENDED = 'Đã kết thúc',
  PENDING = 'Tạm dừng',
}

export enum USER_ROLES {
  USER = 'user',
  ORIGANIZATION = 'organization',
  INDIVIDUAL = 'individual',
  ADMIN = 'admin',
}

export enum USER_GENDER {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

// export enum PAYMENT_METHOD {
//   VNPAY = 'Thanh toán qua VNPay',
//   BANK_TRANSFER = 'Chuyển khoản qua ngân hàng',
//   MOMO = 'Thanh toán qua MoMo',
// }
export enum PAYMENT_METHOD {
  VNPAY = '1',
  MOMO = '2',
  BANK_TRANSFER = '3',
}

export enum PAYMENT_METHOD_CODE {
  VNPAY = 'vnpay',
  MOMO = 'momo',
  BANK_TRANSFER = 'bank_transfer',
}
