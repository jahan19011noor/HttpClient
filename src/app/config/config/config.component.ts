import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Config } from '../config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent implements OnInit {

  config: Config;
  headers: any;
  error: any;

  showConfig_1_data: any;
  showConfig_1_error: "";
  showConfig_2_data: any;
  showConfig_2_error: "";
  showConfig_3_data: any;
  showConfig_3_error: any;
  showConfig_4_data: any;
  showConfig_4_error: any;
  showConfigResponse_headers: any;
  showConfigResponse_response: any;
  
  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.showConfig_1()
    this.showConfig_2()
    this.showConfig_3()
    this.showConfig_4()
    this.showConfigResponse()
  }
  //-- showConfig Version 1
  //--- before "Config" interface
  showConfig_1() {
    this.configService.getConfig_1()
        .subscribe((data: Config) => {
            this.config = {
              heroesUrl: data['heroesUrl'],
              textfile: data['textfile']
            }
            // console.log("getConfig_1: "+JSON.stringify(this.config))
            this.showConfig_1_data = JSON.stringify(this.config)
          }
        )
  }
  //-- showConfig Version 1

  //-- showConfig Version 2
  //--- after "Config" interface
  showConfig_2() {
    this.configService.getConfig_2()
        // clone the data object, using its known Config shapte
        .subscribe((data: Config) => {
          this.config = data
          // console.log("getConfig_2: "+JSON.stringify(this.config))
          this.showConfig_2_data = JSON.stringify(this.config)
        })
  }
  //-- showConfig Version 2

  //-- showConfig Version 3
  //--- after adding "error" handling path
  showConfig_3() {
    this.configService.getConfig_3()
        // clone the data object, using its known Config shapte
        .subscribe(
          (data: Config) => {
          this.config = data
          // console.log("getConfig_3 data: "+JSON.stringify(this.config))
          this.showConfig_3_data = JSON.stringify(this.config)
          },
          error => {
            this.error = error
            // console.log("getConfig_3 error: "+ this.error)
            this.showConfig_3_error = this.error
          }
        )
  }
  //-- showConfig Version 3

  //-- showConfig Version 4
  //--- after adding retry() to service's getConfig_4()
  showConfig_4() {
    this.configService.getConfig_4()
        // clone the data object, using its known Config shapte
        .subscribe(
          (data: Config) => {
          this.config = data
          // console.log("getConfig_4 data: "+JSON.stringify(this.config))
          this.showConfig_4_data = JSON.stringify(this.config)
          },
          error => {
            this.error = error
            // console.log("getConfig_4 error: "+ this.error)
            this.showConfig_4_error = this.error
          }
        )
  }
  //-- showConfig Version 4

  //-- get the response headers as well as the configuration
  showConfigResponse() {
    this.configService.getConfigResponse()
        // resp is of type 'HttpResponse<Config>'
        .subscribe(res => {
          // display its headers
          const keys = res.headers.keys();
          this.headers = keys.map(key => 
            `${key}: ${res.headers.get(key)}`  
          )
          // console.log("showConfigResponse->headers: "+JSON.stringify(this.headers))
          this.showConfigResponse_headers = JSON.stringify(this.headers)

          // access the body directly, which is typed as 'Config'
          this.config = {...res.body}
          // console.log("showConfigResponse->config: "+JSON.stringify(this.config))
          this.showConfigResponse_response = JSON.stringify(this.config)
        })
  }
  //-- get the response headers as well as the configuration
}
