import {RouterModule, Routes} from "@angular/router";
import {WorkspaceComponent} from "./workspace.component";
import {AuthGuard} from "../../auth/auth.guard";
import {NgModule} from "@angular/core";
import { BoardPageComponent } from "./board-page/board-page.component";
import { BoardPageResolverService } from "./board-page-resolver.service";
// import {BoardPageComponent} from "./board-page/board-page.component";
// import { BoardPageResolverService } from "./board-page-resolver.service";

const wsRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: WorkspaceComponent},
      { path: ':id', component: BoardPageComponent, resolve: [BoardPageResolverService]}
      ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(wsRoutes)
  ],
  exports: [RouterModule]
})

export class WorkspaceRoutingModule {}
