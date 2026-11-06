export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type CredentialType = 'paid-exam' | 'free-badge' | 'quick-win';

export interface CertificationMilestone {
  id: string;
  certificationId: string;
  title: string;
  description: string;
  targetDate: string; // YYYY-MM-DD
  isCompleted: boolean;
  createdAt: Date;
}

export interface CertificationItem {
  id: string;
  title: string;
  provider: string;
  credentialType: CredentialType;
  priority: TaskPriority;
  estimatedCost: number;
  estimatedMinutes: number;
  targetCompletionDate: string;
  isCompleted: boolean;
  milestones: Array<CertificationMilestone>;
  createdAt: Date;
}

// Backward-compatibility alias
export type CertificationTask = CertificationItem;