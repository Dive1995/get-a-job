export interface JobTrackingModel {
  id: string;
  position: string;
  company: string;
  location: string;
  language: string;
  siteUrl: string | null;
  status: string;
  appliedOn: string | null;
  applicationId: string | null;
}
