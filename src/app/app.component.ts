import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { CredentialType, TaskPriority } from './models/certificationTask.model';
import { TaskPriorityHighlightDirective } from './directives/taskPriorityHighlight.directive';
import { FormatStudyDurationPipe } from './pipes/formatStudyDuration.pipe';
import { DaysRemainingPipe } from './pipes/daysRemaining.pipe';
import { CopyrightPipe } from './pipes/copyright.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskPriorityHighlightDirective,
    FormatStudyDurationPipe,
    DaysRemainingPipe,
    CopyrightPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected readonly taskService = inject(TaskService);

  // New Certification Form State
  protected certTitle: string = '';
  protected certProvider: string = '';
  protected certCredentialType: CredentialType = 'paid-exam';
  protected certPriority: TaskPriority = 'high';
  protected certMinutes: number = 60;
  protected certCost: number = 150;
  protected certTargetDate: string = new Date().toISOString().split('T')[0];

  // Milestone Form State (with adjustable target date)
  protected milestoneTitle: string = '';
  protected milestoneDescription: string = '';
  protected milestoneTargetDate: string = new Date().toISOString().split('T')[0];

  protected onCredentialTypeChange(): void {
    if (this.certCredentialType !== 'paid-exam') {
      this.certCost = 0;
    }
  }

  protected handleCreateCertification(): void {
    if (!this.certTitle.trim()) {
      return;
    }

    this.taskService.addCertification({
      title: this.certTitle.trim(),
      provider: this.certProvider.trim(),
      credentialType: this.certCredentialType,
      priority: this.certPriority,
      estimatedMinutes: Number(this.certMinutes),
      estimatedCost: Number(this.certCost),
      targetCompletionDate: this.certTargetDate
    });

    this.certTitle = '';
    this.certMinutes = 1200;
  }

  protected handleCreateMilestone(activeCertificationId: string): void {
    if (!this.milestoneTitle.trim()) {
      return;
    }

    this.taskService.addMilestone(
      activeCertificationId,
      this.milestoneTitle.trim(),
      this.milestoneDescription.trim(),
      this.milestoneTargetDate
    );

    this.milestoneTitle = '';
    this.milestoneDescription = '';
    this.milestoneTargetDate = new Date().toISOString().split('T')[0];
  }

  protected handleMilestoneDateChange(activeCertId: string, milestoneId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      this.taskService.updateMilestoneTargetDate(activeCertId, milestoneId, inputElement.value);
    }
  }
}