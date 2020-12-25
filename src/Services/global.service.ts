import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastController, ModalController, NavController, Platform } from '@ionic/angular';
import { Journal } from 'src/Classes/Classes';
import { AuthService } from '../Services/auth.service';
import { NbToastrService, NbWindowService } from '@nebular/theme';
/*import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Journal } from 'src/app/Classes/Classes';
import { AuthService } from './auth.service';
import { EtatsComponent } from '../Modal/etats/etats.component';
*/
@Injectable({
  providedIn: 'root'
})


export class GlobalService {
  public  islog:boolean=true;
  pdfObj = null;
  journal=new Journal();
  user="data:image/jpeg;base64,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"


photo="data:image/jpeg;base64,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";


  

  constructor( 
    public datePipe:DatePipe,
    private modalController:ModalController,
    private toast: ToastController,
    private navctrl:NavController,
    //private windowService: NbWindowService,
    private toastrService: NbToastrService,
    public plt: Platform,
  //  private file: File, private fileOpener: FileOpener,
  //  public store:Storage,
  private auth:AuthService
    )
        
    {

     }

    /* async setweb(key: string, value: any): Promise<any> {
      try {
      const result = await this.store.set(key, value);
      console.log('set string in store: ' + result);
      return true;
      } catch (reason) {
      console.log(reason);
      return false;
      }
      }
      // to getweb a key/value pair
      async getweb(key: string): Promise<any> {
      try {
      const result = await this.store.get(key);
      console.log('storeGET: ' + key + ': ' + result);
      if (result != null) {
      return result;
      }
      return null;
      } catch (reason) {
      alert(reason);
      return null;
      }
      }*/

        public transformDate(date) :string {
          return this.datePipe.transform(date, 'dd MMMM yyyy, h:mm:ss a') //whatever format you need. 
        }
        
        public transformDateSimple(date) :string {
          return this.datePipe.transform(date, 'dd MMMM yyyy').toString();; //whatever format you need. 
        }

       

        public transformDateMod(date) :string {
          return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm:ss').toString();; //whatever format you need. 
        }
        
        public transformDateSimpleEs(date)  {
          return this.datePipe.transform(date, 'MM/dd/yyyy');; //whatever format you need. 

          
        }

  public transformDateMois(date) :number {
    return Number(this.datePipe.transform(date, 'MM').toString()); //whatever format you need. 
  }

  public transformDateAnnee(date): number {
    return Number.parseInt(this.datePipe.transform(date, 'yyyy').toString()); //whatever format you need. 
  }

  public transformDateJour(date): number {
    return Number.parseInt(this.datePipe.transform(date, 'dd').toString()); //whatever format you need. 
  }


  showToast(msg,color?,duration?) {

     if(color)
     {
      
      this.toastrService.show(
       '',   msg,   { duration, status:color });
 
     }
     else
     {
      let duration=5000;
      this.toastrService.show(
       '',   msg,   { duration, status:"success" });
 
     }
      }


   async  showModal(modPage)
   {

      const modal = await this.modalController.create({
        component: modPage
      });
      return await modal.present();
   }


/* async  showModalParam(titre, type,data)
   {

      const modal = await this.modalController.create({
        component: EtatsComponent,
        componentProps: {
          "titre":titre,
         "type"  : type,
        "datas" :data
        }
      });
      return await modal.present();
   }*/

CloseModal()
{
  this.modalController.dismiss();
}

public showPages(x:string)
  {
  //  this.getProfilInfos();
    this.navctrl.navigateRoot(x);    
  }


  /* showModalNb(component,title, data)
  {
    this.windowService.open(component,
       { 
          title: title ,
       context: {
         data: data
       }

      });
  
  }*/
 
  //PDf

  createPdf(entete,width,col,data) {

    var docDefinition = {
      pageMargins: [ 40, 40, 40, 150 ],
    footer: function (currentPage, pageCount) {
        return {
            table: {
                widths: '*',
                body: [
                    [
                        { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'right', style: 'normalText', margin: [0, 20, 50, 0], aligment: 'left' }
                    ]
                ]
            },
            layout: 'noBorders'
        };
    },
  
      content: [
     
        { text: entete, style: 'header',alignment: 'center'  },
        { text: this.transformDateSimple(Date.now()), alignment: 'right' },
  
  
   //   this.tableGen(data, col,width)
  
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
  
  //  this.pdfObj = pdfMake.createPdf(docDefinition);
 //   this.downloadPdf()
  }
  
 /* downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
  
        // Save the PDF to the data Directory of our App
       this.file.writeFile(this.file.dataDirectory, 'Etat.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
         this.fileOpener.open(this.file.dataDirectory + 'Etat.pdf', 'application/pdf');
       // })
      });
    })
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  
  
  buildTableBody(data, columns) {
    var body = [];
  
    body.push(columns);
  
    data.forEach(function(row) {
      var dataRow = [];
  
      columns.forEach(function(column) {
        dataRow.push(row[column]);
      })
  
      body.push(dataRow);
    });
  
    return body;
  }
  
  tableGen(data, columns,width) {
    return {
      table: {
        headerRows: 1,
        widths: width,
        body: this.buildTableBody(data, columns)
      }
    };
  }
  
*/
  

JournalMod(decription?)
  {
    console.log(JSON.parse(localStorage.getItem("Journal")));
    
    this.journal.affect(JSON.parse(localStorage.getItem("Journal")));

   
      let data=[];
      console.log(this.journal);
      if(this.journal.Data)
        data=JSON.parse(this.journal.Data);
      data.push({
        date:this.transformDateMod(Date.now()),
        action:decription
      });
      this.journal.Data=JSON.stringify(data);
  
    
    console.log(this.journal);
    this.auth.GesteJournal('edit', this.journal,this.journal.IdJ).subscribe(x=>{
      localStorage.setItem("Journal",JSON.stringify(this.journal))
      this.showToast('Mod Journal')
    });
  }


}
