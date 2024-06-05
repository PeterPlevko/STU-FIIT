import { Component, Host, Prop, h } from '@stencil/core';
import { createRouter, Route, match } from 'stencil-router-v2';

@Component({
  tag: 'pprerko-home-page',
  styleUrl: 'pprerko-home-page.css',
  shadow: true,
})
export class HomePage {
  @Prop({ attribute: "base-path" }) basePath: string = "";

  static MainRouter;

  connectedCallback() {
    HomePage.MainRouter = HomePage.MainRouter || createRouter();
  }


  rebase(path): string {
    if (this.basePath.endsWith("/")) {
      this.basePath = this.basePath.substring(0, this.basePath.length - 1);
    }
    return this.basePath + path;
  }

  handleAmbulance() {
    HomePage.MainRouter.push(this.rebase(`/doctor/`));
  }

  handleAppointments() {
    HomePage.MainRouter.push(this.rebase(`/appointment/`));
  }

  handleHome() {
    HomePage.MainRouter.push(this.rebase(`/`));
  }

  @Prop({ attribute: "api-uri" })
  apiUri: string = ""

  @Prop() ambulance: string = "";

  handleEditorClosedAmbulance() {
    HomePage.MainRouter.push(this.rebase(`/doctor/`));
  }

  handleEditorClosedAppointment() {
    HomePage.MainRouter.push(this.rebase(`/appointment/`));
  }

  handleEntrySelectionAmbulance(e: CustomEvent) {
    HomePage.MainRouter.push(this.rebase(`/doctor/entry/${e.detail}`));
  }

  handleEntrySelectionAppointment(e: CustomEvent) {
    HomePage.MainRouter.push(this.rebase(`/appointment/entry/${e.detail}`));
  }

  handleNewEntryAmbulance() { HomePage.MainRouter.push(this.rebase(`/doctor/entry/@new`)); }

  handleNewEntryAppointment() { HomePage.MainRouter.push(this.rebase(`/appointment/entry/@new`)); }

  render() {
    return (
      <Host>
        <HomePage.MainRouter.Switch>
          <Route path={this.rebase("/")}>
            <div class="header">
              <h1>Medical system</h1>
            </div>

            <div class="body">
              <mwc-button id="confirm" icon="local_hospital"
                label="Ambulances"
                onCLick={this.handleAmbulance.bind(this)}>
              </mwc-button>

              <mwc-button id="confirm" icon="schedule"
                label="Appointments"
                onClick={this.handleAppointments.bind(this)}>
              </mwc-button>
            </div>
          </Route>

          {/* Ambulance */}

          <Route path={match(this.rebase("/doctor/entry/:id"))}
            render={(params) => (
              <pprerko-ambulance-editor
                api-uri={this.apiUri}
                entry-id={params.id}
                basePath={this.basePath}
                onAmbulanceChange={this.handleEditorClosedAmbulance.bind(this)}
                onDeleted={this.handleEditorClosedAmbulance.bind(this)}
                onCanceled={this.handleEditorClosedAmbulance.bind(this)}></pprerko-ambulance-editor>
            )} />
          <Route path={this.rebase("/doctor/")}>
            <h1 class="header">Ambulances</h1>
            <pprerko-ambulance-list
              api-uri={this.apiUri}
              onAmbulanceSelected={this.handleEntrySelectionAmbulance.bind(this)}>
            </pprerko-ambulance-list>
            <mwc-fab class="addButton" icon="add"
              onCLick={this.handleNewEntryAmbulance.bind(this)}>
            </mwc-fab>
          </Route>

          {/* appointment */}

          <Route path={match(this.rebase("/appointment/entry/:id"))}
            render={(params) => (
              <pprerko-medical-appointment-editor
                entry-id={params.id}
                basePath={this.basePath}
                onMedicalAppointmentChange={this.handleEditorClosedAppointment.bind(this)}
                onDeleted={this.handleEditorClosedAppointment.bind(this)}
                api-uri={this.apiUri}
                onCanceled={this.handleEditorClosedAppointment.bind(this)}></pprerko-medical-appointment-editor>
            )} />
          <Route path={this.rebase("/appointment/")}>
            <h1 class="header">Appointments</h1>
            <pprerko-medical-appointment-list
              api-uri={this.apiUri}
              onMedicalAppointmentSelected={this.handleEntrySelectionAppointment.bind(this)}>
            </pprerko-medical-appointment-list>
            <mwc-fab class="addButton" icon="add"
              onCLick={this.handleNewEntryAppointment.bind(this)}>
            </mwc-fab>
          </Route>
        </HomePage.MainRouter.Switch>

        <div class="sticky">
          <mwc-button id="confirm" icon="home"
            label="Home"
            onClick={this.handleHome.bind(this)}>
          </mwc-button>
        </div>
      </Host>
    );
  }
}
