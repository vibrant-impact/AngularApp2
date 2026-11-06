import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { TaskPriority, CredentialType } from '../models/certificationTask.model';

@Directive({
  selector: '[appTaskPriorityHighlight]',
  standalone: true
})
export class TaskPriorityHighlightDirective implements OnChanges {
  @Input('appTaskPriorityHighlight') priority: TaskPriority = 'medium';
  @Input() isCompleted: boolean = false;
  @Input() credentialType: CredentialType = 'paid-exam';

  constructor(
    private readonly elementReference: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    this.applyCardStyling();
  }

  private applyCardStyling(): void {
    const nativeElement = this.elementReference.nativeElement;

    this.renderer.setStyle(nativeElement, 'transition', 'all 0.25s ease-in-out');
    this.renderer.setStyle(nativeElement, 'borderLeftWidth', '6px');
    this.renderer.setStyle(nativeElement, 'borderLeftStyle', 'solid');

    if (this.isCompleted) {
      this.renderer.setStyle(nativeElement, 'backgroundColor', '#285336');
      this.renderer.setStyle(nativeElement, 'borderLeftColor', '#0e2716');
      this.renderer.setStyle(nativeElement, 'opacity', '0.65');
      this.renderer.setStyle(nativeElement, 'textDecoration', 'line-through');
      this.renderer.setStyle(nativeElement, 'boxShadow', 'none');
      return;
    }

    this.renderer.setStyle(nativeElement, 'backgroundColor', '#3a764d');
    this.renderer.setStyle(nativeElement, 'opacity', '1');
    this.renderer.setStyle(nativeElement, 'textDecoration', 'none');

    switch (this.priority) {
      case 'critical':
        this.renderer.setStyle(nativeElement, 'borderLeftColor', '#fbae28');
        break;
      case 'high':
        this.renderer.setStyle(nativeElement, 'borderLeftColor', '#c6f222');
        break;
      case 'medium':
        this.renderer.setStyle(nativeElement, 'borderLeftColor', '#7dccff');
        break;
      case 'low':
      default:
        this.renderer.setStyle(nativeElement, 'borderLeftColor', '#0e2716');
        break;
    }

    if (this.credentialType === 'quick-win' || this.credentialType === 'free-badge') {
      this.renderer.setStyle(nativeElement, 'boxShadow', '0 0 10px rgba(198, 242, 34, 0.25)');
    } else {
      this.renderer.setStyle(nativeElement, 'boxShadow', 'none');
    }
  }
}