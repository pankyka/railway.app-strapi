export enum InvoiceSource {
  NAV = "NAV",
  SZAMLAZZ_HU = "Számlázz.hu",
  BILLINGO = "Billingo",
}

export enum InvoiceType {
  NORMAL = "normal",
  CORRECTION = "correction",
  PROFORMA = "proforma",
}

export enum Currency {
  HUF = "HUF",
  EUR = "EUR",
  USD = "USD",
}

export enum PaymentMethod {
  BANK_TRANSFER = "bank_transfer",
  CASH = "cash",
  CARD = "card",
  OTHER = "other",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
  PARTIALLY_PAID = "partially_paid",
}

export enum VatRate {
  VAT_27 = "vat_27",
  VAT_18 = "vat_18",
  VAT_5 = "vat_5",
  VAT_0 = "vat_0",
  AAM = "AAM",
  AM = "AM",
  EUK = "EUK",
  FAD = "FAD",
  KBAET = "KBAET",
  KBAUK = "KBAUK",
  MAA = "MAA",
  TAM = "TAM",
}

export interface Partner {
  name: string;
  taxNumber: string;
  countryCode: string;
  postalCode: string;
  city: string;
  address: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalNet: number;
  totalGross: number;
  vatRate: VatRate;
  vatAmount: number;
}

export interface Invoice {
  source: InvoiceSource;
  sourceInvoiceId: string;
  invoiceNumber: string;
  issueDate: string;
  fulfillmentDate: string;
  dueDate: string;
  currency: Currency;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  totalNet: number;
  totalGross: number;
  vatAmount: number;
  invoiceType: InvoiceType;
  partner: Partner;
  items: InvoiceItem[];
  originalXml?: string;
  documentSource?: string;
  archivedAt?: string;
}
