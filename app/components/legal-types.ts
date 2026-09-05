export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  lists?: {
    title?: string;
    items: string[];
    isOrdered?: boolean;
  }[];
}
