import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ClienteComponent } from './component/cliente/cliente.component';
import { AbogadoComponent } from './component/abogado/abogado.component';
import { AgregarImbuebleComponent } from './component/agregar-imbueble/agregar-imbueble.component';
import { ListaInmuebleComponent } from './component/lista-inmueble/lista-inmueble.component';
import { DocumentosComponent } from './component/documentos/documentos.component';
import { ListaClienteComponent } from './component/lista-cliente-arrendador/lista-cliente.component';
import { ListaInmuebleClienteComponent } from './component/lista-inmueble-cliente/lista-inmueble-cliente.component';
import { ListaDocumentosClienteComponent } from './component/lista-documentos-cliente/lista-documentos-cliente.component';
import { ListaClienteArrendatarioComponent } from './component/lista-cliente-arrendatario/lista-cliente-arrendatario.component';
import { RegistroClienteComponent } from './component/registro-cliente/registro-cliente.component';
import { RegistroAbogadoComponent } from './component/registro-abogado/registro-abogado.component';
import { ListaInmuebleFullComponent } from './component/lista-inmueble-full/lista-inmueble-full.component';
import { ListaInmueblesAplicadosComponent } from './component/lista-inmuebles-aplicados/lista-inmuebles-aplicados.component';
import { MostrarInmuebleComponent } from './component/mostrar-inmueble/mostrar-inmueble.component';
import { MostrarClienteComponent } from './component/mostrar-cliente/mostrar-cliente.component';
import { ProcesoComponent } from './component/proceso/proceso.component';
import { ArrendatarioAplicadosComponent } from './component/arrendatario-aplicados/arrendatario-aplicados.component';
import { ListaInmueblesArrendadorComponent } from './component/lista-inmuebles-arrendador/lista-inmuebles-arrendador.component';
import { ResponsePaycoComponent } from './component/response-payco/response-payco.component';
import { EditarInmuebleComponent } from './component/editar-inmueble/editar-inmueble.component';
import { InmuebleAplicadoComponent } from './component/inmueble-aplicado/inmueble-aplicado.component';
import { ResponseMesComponent } from './component/response-mes/response-mes.component';
import { AdministradorComponent } from './component/administrador/administrador.component';
import { ClientesRegistradosComponent } from './component/clientes-registrados/clientes-registrados.component';
import { AbogadosRegistradosComponent } from './component/abogados-registrados/abogados-registrados.component';
import { InmuebleRegistradosComponent } from './component/inmueble-registrados/inmueble-registrados.component';
import { MiPerfilComponent } from './component/mi-perfil/mi-perfil.component';
import { EditarDocumentosComponent } from './component/editar-documentos/editar-documentos.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},

  {path:'abogado', component:AbogadoComponent,
  children: [
    {path:'lista-cliente-arrendador', component:ListaClienteComponent},
    {path:'lista-cliente-arrendatario', component:ListaClienteArrendatarioComponent},
    {path:'lista-inmueble-cliente/:id', component:ListaInmuebleClienteComponent},
    {path:'lista-documentos-cliente/:id', component:ListaDocumentosClienteComponent},
    {path:'registro-abogado', component:RegistroAbogadoComponent},
    {path:'lista-inmuebles-aplicados', component:ListaInmueblesAplicadosComponent},
    {path:'mostrar-inmueble/:id', component:MostrarInmuebleComponent},
    {path:'mostrar-cliente/:id', component:MostrarClienteComponent},
    {path:'proceso/:id', component:ProcesoComponent},
  ]},

  {path:'cliente', component:ClienteComponent,
  children: [
    {path:'agregar-inmueble', component:AgregarImbuebleComponent},
    {path:'lista-inmueble', component:ListaInmuebleComponent},
    {path:'documentos', component:DocumentosComponent},
    {path:'registro-cliente', component:RegistroClienteComponent},
    {path:'lista-inmueble-full/:id', component:ListaInmuebleFullComponent},
    {path:'arrendatario-aplicados', component:ArrendatarioAplicadosComponent},
    {path:'lista-inmueble-arrendador', component:ListaInmueblesArrendadorComponent},
    {path:'response', component:ResponsePaycoComponent},
    {path:'responseMes', component:ResponseMesComponent},
    {path:'editar-inmueble/:id', component:EditarInmuebleComponent},
    {path:'inmueble-aplicado', component:InmuebleAplicadoComponent},
    {path:'mi-perfil', component:MiPerfilComponent},
    {path:'editar-documentos/:id', component:EditarDocumentosComponent}
  ]},

  {path:'administrador', component:AdministradorComponent,
  children: [
    {path:'cliente-registrado', component:ClientesRegistradosComponent},
    {path:'abogado-registrado', component:AbogadosRegistradosComponent},
    {path:'inmueble-registrado', component:InmuebleRegistradosComponent},
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
