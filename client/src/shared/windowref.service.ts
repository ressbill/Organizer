import {Injectable} from "@angular/core"

function _window() {
  return window;
}

@Injectable({providedIn: 'root'})
export class WindowRef{
  get nativeWindow(){
    return _window()
  }
}
