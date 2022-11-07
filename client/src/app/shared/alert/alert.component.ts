import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {


  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit()
  }

}
