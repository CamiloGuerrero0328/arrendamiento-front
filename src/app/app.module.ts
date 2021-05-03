import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
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
import { ListaInmuebleFullComponent } from './component/lista-inmueble-full/lista-inmueble-full.component';
import { ListaInmueblesAplicadosComponent } from './component/lista-inmuebles-aplicados/lista-inmuebles-aplicados.component';
import { MostrarInmuebleComponent } from './component/mostrar-inmueble/mostrar-inmueble.component';
import { MostrarClienteComponent } from './component/mostrar-cliente/mostrar-cliente.component';
import { ProcesoComponent } from './component/proceso/proceso.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ArrendatarioAplicadosComponent } from './component/arrendatario-aplicados/arrendatario-aplicados.component';
import { ListaInmueblesArrendadorComponent } from './component/lista-inmuebles-arrendador/lista-inmuebles-arrendador.component';
import { PipePipe } from './component/pipe.pipe';
import { ResponsePaycoComponent } from './component/response-payco/response-payco.component';
import { TarjetaInmuebleComponent } from './component/tarjeta-inmueble/tarjeta-inmueble.component';
import { EditarInmuebleComponent } from './component/editar-inmueble/editar-inmueble.component';
import { InmuebleAplicadoComponent } from './component/inmueble-aplicado/inmueble-aplicado.component';

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
    ListaInmuebleFullComponent,
    ListaInmueblesAplicadosComponent,
    MostrarInmuebleComponent,
    MostrarClienteComponent,
    ProcesoComponent,
    ArrendatarioAplicadosComponent,
    ListaInmueblesArrendadorComponent,
    PipePipe,
    ResponsePaycoComponent,
    TarjetaInmuebleComponent,
    EditarInmuebleComponent,
    InmuebleAplicadoComponent,
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
    PdfViewerModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
