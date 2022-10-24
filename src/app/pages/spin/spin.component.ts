import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { send } from 'process';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.scss']
})
export class SpinComponent implements OnInit {

     constructor(private data: DataService) { }

     spinResponseText: string = "";
     possibleCombinationsText: string = "0";
     generatedText: string = "";
     processedText: string = "{hey|yo}";

     outputJSON: string = "";

     processedJSON: string = "";
     sentimentOutput: string = "";

     sentimentCounter: number = 0;

     ngOnInit() {
     }

     spinText(event, text)
     {
          if (event.keyCode === 13) {
               this.generate(text);
          }
          
     }

     getJSON(event, text) {
          if (event.keyCode === 13) {
               this.processJSON(text);
          }

     }

     getSentiment(event, text) {
          if (event.keyCode === 13) {
               this.processSentimentJSON(text);
          }

     }

     generate(text)
     {
          text = text.replace(/(\r\n|\n|\r)/gm, "");
          this.processedText = text;
          console.log("starting");
          this.data.spin(text).subscribe((response) => {

               console.log("Data: " + JSON.stringify(response));

               this.spinResponseText = "<br><hr><br>Generated: <br>";
               this.possibleCombinationsText = Number(response['combinations']).toLocaleString()+"";
               this.generatedText = response['generated'];
               this.copyMessage(response['generated']);
          });
     }

     copyMessage(val: string) {
          const selBox = document.createElement('textarea');
          selBox.style.position = 'fixed';
          selBox.style.left = '0';
          selBox.style.top = '0';
          selBox.style.opacity = '0';
          selBox.value = val;
          document.body.appendChild(selBox);
          selBox.focus();
          selBox.select();
          document.execCommand('copy');
          document.body.removeChild(selBox);
     }

     processJSON(text)
     {
          let data = JSON.parse(text);
          // console.log("Variation Name: "+data[0]['VARIATION 1 NAME']);
          for(var a = 0; a < data.length; a++)
          {
               data[a]['VARIATION 1 NAME'] = "";
               data[a]['VARIATION 1 TYPE'] = "";
               data[a]['VARIATION 1 VALUES'] = "";
               data[a]['VARIATION 2 NAME'] = "";
               data[a]['VARIATION 2 TYPE'] = "";
               data[a]['VARIATION 2 VALUES'] = "";

          }
          this.outputJSON = JSON.stringify(data);
     }

     processSentimentJSON(text)
     {
          let data = JSON.parse(text);

          for (var a = 0; a < data.length; a++) {
               this.sentimentOutput += a+" - <b>" + data[a]['name'] + ":</b>  " + data[a]['tweet'] + "<br><div style='color: black !important'>";
               
               for (var i = 0; i < data[a]['emotions']['document_tone']['tones'].length; i++)
               {
                    this.sentimentOutput += data[a]['emotions']['document_tone']['tones'][i]['tone_name'] + ":  " + 
                         (Number.parseFloat(data[a]['emotions']['document_tone']['tones'][i]['score']) * 100).toFixed(0)+"% &nbsp;&nbsp;&nbsp;";
               }
               this.sentimentOutput = this.sentimentOutput.substring(0, this.sentimentOutput.length - 1);
               this.sentimentOutput += "</div><br><br>";
          }

          
     }

     addOne()
     {
          this.sentimentCounter++;
     }

}
