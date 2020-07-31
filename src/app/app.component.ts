import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  n: number;
  a;
  b;
  arrSign = ['+', '-', '*', '/'];
  answerRight;
  answerUser;
  message;
  allAnswer = -1;
  allRight = 0;
  allWrong = 0;
  allSkip = 0;


  @ViewChild('aInput', {static: true}) aInput: ElementRef;
  answerVisible: boolean;

  @HostListener('document:keydown.enter') undo2(event: KeyboardEvent): void {
    console.log('document:keydown.enter');
    this.hideHandler();
  }

  @HostListener('document:keydown.space') undo3(event: KeyboardEvent): void {
    console.log('document:keydown.space');
    this.nextHandler();
  }

  @HostListener('document:keydown.+') undo5(event: KeyboardEvent): void {
    console.log('document:keydown.+');
    this.answerUser = undefined;
    this.aInput.nativeElement.value = '';
    this.nextHandler();
  }

  constructor() {
    this.next();
  }

  ngOnInit(): void {
    this.aInput.nativeElement.focus();
  }

  public next(): void {
    this.example();
    this.answerVisible = false;
    this.allAnswer++;
  }

  public example(): void {// расщет вопроса
    this.n = Math.floor(Math.random() * Math.floor(4));
    this.a = Math.floor(Math.random() * 10);
    this.b = Math.floor(Math.random() * 10);
    switch (this.n) {
      case 0: {
        console.log(0);
        this.answerRight = this.a + this.b;
        break;
      }
      case 1: {
        console.log(1);
        this.answerRight = this.a - this.b;
        break;
      }
      case 2: {
        console.log(2);
        this.answerRight = this.a * this.b;
        break;
      }
      case 3: {
        console.log(3);
        this.answerRight = this.a / this.b;
        break;
      }
    }


  }


  public nextHandler(): void {// скип вопрос
    this.allSkip++;
    this.next();
    this.aInput.nativeElement.focus();
  }

  hideHandler(): void {// показ подсказки
    if (!this.answerVisible) {
      this.answerVisible = true;
    }
    this.aInput.nativeElement.focus();
  }


  checkedAnswer($event: Event): void { // проверка ответа
    console.log('checkedAnswer ', $event);
    if ($event.toString().indexOf(' ') !== -1 || $event.toString().indexOf('+') !== -1) {
      this.answerUser = undefined;
      this.aInput.nativeElement.value = '';
      return;
    }

    if (this.answerRight === +$event) {
      this.next();
      this.answerUser = undefined;
      this.aInput.nativeElement.value = '';
      this.message = '';
      this.allRight++;
    } else {
      if (this.answerRight.toString().length <= $event.toString().length) {
        this.message = 'wrong';
        this.answerVisible = true;
        this.allWrong++;
        this.next();
        this.answerUser = undefined;
        this.aInput.nativeElement.value = '';
      } else {
        this.message = '';
      }
    }
  }

}
