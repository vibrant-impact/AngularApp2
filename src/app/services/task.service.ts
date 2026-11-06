import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CertificationItem, CertificationMilestone } from '../models/certificationTask.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly initialCertifications: Array<CertificationItem> = [
    {
      id: 'cert-1',
      title: 'Oracle Java SE 21 Developer (1Z0-830)',
      provider: 'Oracle',
      credentialType: 'paid-exam',
      priority: 'critical',
      estimatedCost: 245,
      estimatedMinutes: 3600, // 60 hours
      targetCompletionDate: '2026-11-27',
      isCompleted: false,
      createdAt: new Date(),
      milestones: [
        {
          id: 'ms-1-1',
          certificationId: 'cert-1',
          title: 'Review Enthuware Mock Exam 3',
          description: 'Analyze concurrency, sealed interfaces, and pattern matching weak points.',
          targetDate: '2026-11-15',
          isCompleted: false,
          createdAt: new Date()
        },
        {
          id: 'ms-1-2',
          certificationId: 'cert-1',
          title: 'Purchase Black Friday Sale Exam Voucher',
          description: 'Check Oracle University promotion store for holiday discount codes.',
          targetDate: '2026-11-20',
          isCompleted: false,
          createdAt: new Date()
        }
      ]
    },
    {
      id: 'cert-2',
      title: 'AWS Certified Developer - Associate (DVA-C02)',
      provider: 'AWS',
      credentialType: 'paid-exam',
      priority: 'high',
      estimatedCost: 150,
      estimatedMinutes: 2400,
      targetCompletionDate: '2026-12-20',
      isCompleted: false,
      createdAt: new Date(),
      milestones: [
        {
          id: 'ms-2-1',
          certificationId: 'cert-2',
          title: 'Serverless CI/CD Pipeline Lab',
          description: 'Practice SAM and CodePipeline automated deployments.',
          targetDate: '2026-12-10',
          isCompleted: false,
          createdAt: new Date()
        },
        {
          id: 'ms-2-2',
          certificationId: 'cert-2',
          title: 'Complete Udemy AWS Course',
          description: 'Practice exams with explanations and practice.',
          targetDate: '2027-01-15',
          isCompleted: false,
          createdAt: new Date()
        }
      ]
    },
    {
      id: 'cert-3',
      title: 'Microsoft Applied Skills: Azure Container Apps',
      provider: 'Microsoft',
      credentialType: 'quick-win',
      priority: 'medium',
      estimatedCost: 0,
      estimatedMinutes: 60,
      targetCompletionDate: '2026-11-18',
      isCompleted: false,
      createdAt: new Date(),
      milestones: [
        {
          id: 'ms-3-1',
          certificationId: 'cert-3',
          title: 'Run interactive sandbox lab',
          description: 'Deploy revision containers and test traffic splitting.',
          targetDate: '2026-11-18',
          isCompleted: false,
          createdAt: new Date()
        }
      ]
    },
    {
      id: 'cert-4',
      title: 'AWS Educate: Machine Learning Foundations',
      provider: 'AWS',
      credentialType: 'free-badge',
      priority: 'high',
      estimatedCost: 0,
      estimatedMinutes: 120,
      targetCompletionDate: '2026-11-20',
      isCompleted: false,
      createdAt: new Date(),
      milestones: []
    },
    {
      id: 'cert-5',
      title: 'Apple App Development with Swift: Certified User',
      provider: 'Apple / Certiport',
      credentialType: 'paid-exam',
      priority: 'medium',
      estimatedCost: 125,
      estimatedMinutes: 1800,
      targetCompletionDate: '2027-01-15',
      isCompleted: false,
      createdAt: new Date(),
      milestones: []
    }
  ];

  // Subject holding all certifications
  private readonly certificationsSubject = new BehaviorSubject<Array<CertificationItem>>(this.initialCertifications);
  public readonly certifications$: Observable<Array<CertificationItem>> = this.certificationsSubject.asObservable();

  // Subject holding the currently selected certification ID
  private readonly selectedCertificationIdSubject = new BehaviorSubject<string>('cert-1');
  public readonly selectedCertificationId$: Observable<string> = this.selectedCertificationIdSubject.asObservable();

  // Combine both streams so selecting a pill immediately updates the active certification
  public readonly activeCertification$: Observable<CertificationItem | undefined> = combineLatest([
    this.certifications$,
    this.selectedCertificationId$
  ]).pipe(
    map(([certifications, activeId]: [Array<CertificationItem>, string]) => {
      return certifications.find((cert: CertificationItem) => cert.id === activeId) ?? certifications[0];
    })
  );

  // Stream calculating total active budget
  public readonly pendingBudgetTotal$: Observable<number> = this.certifications$.pipe(
    map((certs: Array<CertificationItem>) =>
      certs
        .filter((cert: CertificationItem) => !cert.isCompleted)
        .reduce((sum: number, cert: CertificationItem) => sum + cert.estimatedCost, 0)
    )
  );

  /**
   * Sets the active certification.
   */
  public selectCertification(certificationId: string): void {
    this.selectedCertificationIdSubject.next(certificationId);
  }

  /**
   * Adds a new certification.
   */
  public addCertification(newCertData: Omit<CertificationItem, 'id' | 'isCompleted' | 'milestones' | 'createdAt'>): void {
    const currentList = this.certificationsSubject.getValue();
    const createdCert: CertificationItem = {
      ...newCertData,
      id: `cert-${Date.now()}`,
      isCompleted: false,
      milestones: [],
      createdAt: new Date()
    };
    this.certificationsSubject.next([...currentList, createdCert]);
    this.selectedCertificationIdSubject.next(createdCert.id);
  }

  /**
   * Toggles certification complete status.
   */
  public toggleCertificationCompletion(certificationId: string): void {
    const updated = this.certificationsSubject.getValue().map((cert: CertificationItem) => {
      if (cert.id === certificationId) {
        return { ...cert, isCompleted: !cert.isCompleted };
      }
      return cert;
    });
    this.certificationsSubject.next(updated);
  }

  /**
   * Deletes a certification.
   */
  public deleteCertification(certificationId: string): void {
    const filtered = this.certificationsSubject.getValue().filter(
      (cert: CertificationItem) => cert.id !== certificationId
    );
    this.certificationsSubject.next(filtered);
    if (this.selectedCertificationIdSubject.getValue() === certificationId && filtered.length > 0) {
      this.selectedCertificationIdSubject.next(filtered[0].id);
    }
  }

  /**
   * Adds a milestone to the specified certification.
   */
  public addMilestone(certificationId: string, title: string, description: string, targetDate: string): void {
  const updated = this.certificationsSubject.getValue().map((cert: CertificationItem) => {
    if (cert.id === certificationId) {
      const newMilestone: CertificationMilestone = {
        id: `ms-${Date.now()}`,
        certificationId: cert.id,
        title,
        description,
        targetDate: targetDate || new Date().toISOString().split('T')[0],
        isCompleted: false,
        createdAt: new Date()
      };
      return { ...cert, milestones: [newMilestone, ...cert.milestones] };
    }
    return cert;
  });
  this.certificationsSubject.next(updated);
}

/**
 * Updates the target date of an existing milestone dynamically.
 */
  public updateMilestoneTargetDate(certificationId: string, milestoneId: string, newDate: string): void {
    const updated = this.certificationsSubject.getValue().map((cert: CertificationItem) => {
      if (cert.id === certificationId) {
        const updatedMilestones = cert.milestones.map((ms: CertificationMilestone) => {
          if (ms.id === milestoneId) {
            return { ...ms, targetDate: newDate };
          }
          return ms;
        });
        return { ...cert, milestones: updatedMilestones };
      }
      return cert;
    });
    this.certificationsSubject.next(updated);
  }

  /**
   * Toggles milestone completion.
   */
  public toggleMilestoneCompletion(certificationId: string, milestoneId: string): void {
    const updated = this.certificationsSubject.getValue().map((cert: CertificationItem) => {
      if (cert.id === certificationId) {
        const updatedMilestones = cert.milestones.map((ms: CertificationMilestone) => {
          if (ms.id === milestoneId) {
            return { ...ms, isCompleted: !ms.isCompleted };
          }
          return ms;
        });
        return { ...cert, milestones: updatedMilestones };
      }
      return cert;
    });
    this.certificationsSubject.next(updated);
  }

  /**
   * Deletes a milestone.
   */
  public deleteMilestone(certificationId: string, milestoneId: string): void {
    const updated = this.certificationsSubject.getValue().map((cert: CertificationItem) => {
      if (cert.id === certificationId) {
        return {
          ...cert,
          milestones: cert.milestones.filter((ms: CertificationMilestone) => ms.id !== milestoneId)
        };
      }
      return cert;
    });
    this.certificationsSubject.next(updated);
  }
}