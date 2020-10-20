import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './component/cliente/cliente.component';
import { AbogadoComponent } from './component/abogado/abogado.component';
import { AgregarImbuebleComponent } from './component/agregar-imbueble/agregar-imbueble.component';
import { ListaInmuebleComponent } from './component/lista-inmueble/lista-inmueble.component';
import { DocumentosComponent } from './component/documentos/documentos.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ListaClienteComponent } from './component/lista-cliente-arrendador/lista-cliente.component';
import { ListaInmuebleClienteComponent } from './component/lista-inmueble-cliente/lista-inmueble-cliente.component';
import { ListaDocumentosClienteComponent } from './component/lista-documentos-cliente/lista-documentos-cliente.component';
import { ListaClienteArrendatarioComponent } from './component/lista-cliente-arrendatario/lista-cliente-arrendatario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroClienteComponent } from './component/registro-cliente/registro-cliente.component';
import { RegistroAbogadoComponent } from './component/registro-abogado/registro-abogado.component';
import { AplicarInmuebleComponent } from './component/aplicar-inmueble/aplicar-inmueble.component';
import { ListaInmuebleFullComponent } from './component/lista-inmueble-full/lista-inmueble-full.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClienteComponent,
    AbogadoComponent,
    AgregarImbuebleComponent,
    ListaInmuebleComponent,
    DocumentosComponent,
    ListaClienteComponent,
    ListaInmuebleClienteComponent,
    ListaDocumentosClienteComponent,
    ListaClienteArrendatarioComponent,
    RegistroClienteComponent,
    RegistroAbogadoComponent,
    AplicarInmuebleComponent,
    ListaInmuebleFullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireStorageModule,
    NgbModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
