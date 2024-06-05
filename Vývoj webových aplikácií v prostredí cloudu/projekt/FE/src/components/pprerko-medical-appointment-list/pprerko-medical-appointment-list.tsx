import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { AmbulanceUsersApi, MedicalAppointment } from '../../api';

@Component({
  tag: 'pprerko-medical-appointment-list',
  styleUrl: 'pprerko-medical-appointment-list.css',
  shadow: true,
})
export class PprerkoMedicalAppointmentList {
  @Prop({ attribute: "selected-entry-id", mutable: true, reflect: true})
  selectedEntryId: string

  @Prop({ attribute: "api-uri" })
  apiUri: string = null;

  @Event()
  medicalAppointmentSelected: EventEmitter<string>;

  handleEntrySelection(entryId: string, event: CustomEvent) {
    if(event.detail.source === "interaction") {
      this.selectedEntryId = entryId;
      this.medicalAppointmentSelected.emit(entryId);
    }
  }
  medicalAppointmentList: MedicalAppointment[];

  private userApiClient = new AmbulanceUsersApi(undefined, this.apiUri);

  async componentWillLoad() {
    this.medicalAppointmentList = await this.userApiClient
      .getAppointmentEntries()
      .then(_ => _.data)
      .catch(_ => []);

    if(this.medicalAppointmentList==null){
      this.medicalAppointmentList = [];
    }
  }

  render() {
    return (
      <Host>
        <div>
        <mwc-list>

          { this.medicalAppointmentList.map( entry =>
            <mwc-list-item graphic="avatar" twoline
                           selected={entry.id === this.selectedEntryId ? true : false}
                           activated={entry.id === this.selectedEntryId ? true : false}
                           onRequest-selected={ev => this.handleEntrySelection(entry.id, ev)} class="listItem">
              <div>{entry.patientName}</div>
              <mwc-icon class="hospitalIcon" slot="graphic">schedule</mwc-icon>
            </mwc-list-item>
          )}
        </mwc-list>
        </div>
      </Host>
    );
  }
}
