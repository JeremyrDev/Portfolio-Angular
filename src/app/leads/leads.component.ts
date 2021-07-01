import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';

@Component({
     selector: 'app-leads',
     templateUrl: './leads.component.html',
     styleUrls: ['./leads.component.scss'],
     encapsulation: ViewEncapsulation.None
})
export class LeadsComponent implements OnInit {

     constructor(private data: DataService) { }

     resultsText: string = "-";
     latlonText: string = "40.935209, -80.361479";
     radiusText: string = "200";

     ngOnInit() {

     }

     generateLead(latlon, radius)
     {
          this.latlonText = latlon;
          this.radiusText = radius;

          this.resultsText = "";

          this.data.getLeads(latlon, radius).subscribe((response) => {

               console.log("Data: " + JSON.stringify(response));
               let d = response['data']['results'];
               // this.resultsText = response['data']['results'][0].place_id;
               for (var i = 0; i < d.length; i++)
               {
                    this.resultsText += "<div class='" + (this.notEmpty(d[i].business_status) == "OPERATIONAL" ? "green":"red") + "'><img src='"+this.notEmpty(d[i].icon) + "' height='25px' /> : <b>"+
                         this.notEmpty(d[i].name) + "</b> : " +
                         this.notEmpty(d[i].place_id) + " :  " +
                         this.notEmpty(d[i].user_ratings_total) + " : (";

                    this.resultsText += d[i]['types'].length;

                    // for (var a = 0; response['data']['results'][i]['types'].length; a++) {
                    //      this.resultsText += this.notEmpty(response['data']['results'][i]['type'][a]) + ", ";
                    // }

                    // for (var a = 0; response['data']['results'][i]['types'].length; a++) {
                    //      this.resultsText += this.notEmpty(response['data']['results'][i]['types'][a]) + ", ";
                    // }

                    this.resultsText += ")</div><br>";
               }

               // this.spinResponseText = "<br><hr><br>Generated: <br>";
               // this.possibleCombinationsText = Number(response['combinations']).toLocaleString() + "";
               // this.generatedText = response['generated'];
               // this.copyMessage(response['generated']);
          });
     }

     notEmpty(text)
     {
          if (text != '' || text != undefined || text != 'undefined')
               return text;
          else 
               return "";
     }

}
