import { Component, OnInit } from '@angular/core';
import { DownloaderService } from '../downloader.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styles: [`
    button {
      margin-right: 10px;
    }
  `]
})
export class DownloaderComponent {

  file_content: any;

  constructor(private downloaderService: DownloaderService) {
  }

  clear() {
    this.file_content = undefined;
  }

  download() {
    this.downloaderService.getTextFile('assets/textfile.txt')
        .subscribe(results => this.file_content = results)
  }

}
