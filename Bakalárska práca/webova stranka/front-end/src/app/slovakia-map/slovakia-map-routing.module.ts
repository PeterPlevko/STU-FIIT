import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddInformationFormComponent } from "./add-information-form/add-information-form.component";
import { BattleComponent } from "./battle/battle.component";
import { CemeteryComponent } from "./cemetery/cemetery.component";
import { DeceasedListComponent } from "./deceased-list/deceased-list.component";
import { MemorialComponent } from "./memorial/memorial.component";
import { SoldierComponent } from "./soldier/soldier.component";
import { WarCampComponent } from "./war-camp/war-camp.component";


const routes: Routes = [
  { path: '', component: AddInformationFormComponent },
  { path: 'soldier', component: SoldierComponent },
  { path: 'cemetery', component: CemeteryComponent },
  { path: 'battle', component: BattleComponent },
  { path: 'memorial', component: MemorialComponent },
  { path: 'warCamp', component: WarCampComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlovakiaRoutingModule {}
