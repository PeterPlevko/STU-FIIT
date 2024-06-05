import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { ChangeBattleComponent } from './change-battle/change-battle/change-battle.component';
import { ChangeCemeteryComponent } from './change-cemetery/change-cemetery/change-cemetery.component';
import { ChangeMemorialComponent } from './change-memorial/change-memorial.component';
import { ChangeSoldierComponent } from './changeSoldier/change-soldier/change-soldier.component';
import { ChangeWarCampComponent } from './change-war-camp/change-war-camp.component';
import { ChangeUserComponent } from './change-user/change-user.component';



const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'change-battle', component: ChangeBattleComponent },
  { path: 'change-cemetery', component: ChangeCemeteryComponent },
  { path: 'change-memorial', component: ChangeMemorialComponent },
  { path: 'change-soldier', component: ChangeSoldierComponent },
  { path: 'change-war-camp', component: ChangeWarCampComponent },
  { path: 'change-user', component: ChangeUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
