import { Component, inject, input, OnInit } from '@angular/core';
import { DayTranslatePipe, Menu } from 'cerebellum';
import { MatDialog } from '@angular/material/dialog';
import { NutritionalDialog } from 'sibella';

@Component({
  selector: 'app-card',
  imports: [
    DayTranslatePipe
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnInit {
  private readonly dialogref = inject(MatDialog);

  public menu = input.required<Menu>();
  public today: boolean = false;
  
  ngOnInit() {
    this.checkDate();
  }

  public openNutritionalInfoDialog() {
    this.dialogref.open(NutritionalDialog, { data: { snacks: this.menu().snacks, lunches: this.menu().lunches } });
  }

  private checkDate() {
    const today = new Date();
    const dayWeek = today.getDay() - 1;

    const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
    this.today = days[dayWeek] === this.menu().day;
  }
}
