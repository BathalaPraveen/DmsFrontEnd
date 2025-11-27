import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, NgForOf],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() itemsPerPage = 5;
  @Input() pageSizes = [5, 10, 20, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  updateItemsPerPage() {
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }
}
