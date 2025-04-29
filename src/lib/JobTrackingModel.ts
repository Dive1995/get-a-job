export interface JobTrackingModel {
  position: string;
  company: string;
  location: string;
  language: string;
  siteUrl: string | null;
  status: string;
  appliedOn: string | null;
  applicationId: number | null;
}
