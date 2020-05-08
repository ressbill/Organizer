import {Component, Inject} from "@angular/core"
import {MAT_DIALOG_DATA} from "@angular/material/dialog"

@Component({
  templateUrl: './error.component.html',
  styles: [`.centered {
      display: flex;
      justify-content: center;
  }`]
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
  }
}
