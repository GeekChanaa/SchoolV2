import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadCSS();
    this.loadScripts();
  }


  // Loading Css Files for dashboard
  loadCSS() {
    const cssFiles = [
      "/assets/css/app.css",
    ];
    for (let i = 0; i < cssFiles.length; i++) {
      const node = document.createElement('link');
      node.href = cssFiles[i];
      node.rel = "stylesheet";
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }


  // Loading JS Files for dashboard
  loadScripts() {
    const jsFiles = [
      "/assets/js/app.js",
      "/assets/js/common.js",
      "/assets/js/charts.js",
    ];
    for (let i = 0; i < jsFiles.length; i++) {
      const node = document.createElement('script');
      node.src = jsFiles[i];
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

}
