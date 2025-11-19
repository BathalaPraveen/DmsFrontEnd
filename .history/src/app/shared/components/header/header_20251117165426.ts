import { Component, signal, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  time = signal('');

  ngOnInit() {
    setInterval(() => {
      this.time.set(new Date().toLocaleTimeString());
    }, 1000);
  }
}
